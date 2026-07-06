# Room46 全部页面构建 + 目录重组 实施计划

> **给代理工作者：** 逐任务实施此计划。步骤使用复选框（`- [ ]`）语法进行跟踪。

**目标：** 完成 Room46 ARG 游戏的全部页面构建（表论坛/里论坛/结局），并按目录结构重组文件。

**架构：** 
1. 根目录保留 `forum.html` 作为入口
2. `surface/` 目录存放所有表论坛页面（现有帖子页 + 功能页）
3. `inner/` 目录存放里论坛页面（暗色心理恐怖风格）
4. `ending/` 目录存放结局页面
5. Python 脚本统一修复所有跨目录链接路径

**技术栈：** 纯静态 HTML5+CSS3+Vanilla JS（零依赖）

## 全局约束

- 所有页面使用统一的 CSS 风格（千禧年 Y2K 论坛外观）
- 所有内部链接必须是正确的相对路径
- 每页 15KB+ 内容丰富
- 纯静态，无外部依赖
- 所有文件使用 `.html` 扩展名
- 目录结构完成后立即验证所有链接可访问

---

### 任务 1：创建链接路径修复脚本

**文件：**
- 创建：`E:\claude code\room46_v2\.fix-paths.py`

**说明：** 
在将当前所有 HTML 文件（除 forum.html）移动到 `surface/` 目录后，需要更新所有跨文件链接。此脚本处理：
1. 根目录文件中对 `surface/` 页面的引用 → 加上 `surface/` 前缀
2. `surface/` 页面中对根目录文件的引用 → 加上 `../` 前缀
3. `surface/` 页面间引用 → 保持不变（同一目录）
4. 所有 `window.location.href=` 和 `<a href="...">` 和搜索路由映射
5. `inner/` 和 `ending/` 页面中的引用 → 正确的相对路径

**逻辑：**

- [ ] **步骤 1：编写链接修复脚本**

文件映射规则：
```
forum.html → 根目录（不移动）
其他所有 .html → surface/
inner/ 和 ending/ 中的页面 → 各自目录
```

路径转换表：
| 原引用 | 新引用（在 surface/ 中） | 新引用（在 inner/ 中） |
|--------|------------------------|------------------------|
| forum.html | ../forum.html | ../forum.html 或 ../../forum.html |
| echo.html | echo.html（同目录不变） | ../surface/echo.html |
| rules.html | rules.html（同目录不变） | ../surface/rules.html |
| admin.html | admin.html（同目录不变） | ../surface/admin.html |
| login.html | login.html（同目录不变） | ../surface/login.html |
| profile.html | profile.html（同目录不变） | ../surface/profile.html |

脚本 `fix-paths.py` 核心逻辑：

```python
import os, re

DIR = r"E:\claude code\room46_v2"

# 页面列表：所有会移动到 surface/ 的页面
SURFACE_PAGES = [
    'rules', 'newbie', 'echo', 'browser', 'dream',
    'food', 'movie', 'travel', 'diary', 'tech',
    'router', 'suzhou', 'moon',
    'login', 'profile', 'admin', 'register', 'faq', 'drafts'
]

# 所有 .html 文件的当前路径（深度递归）
for root, dirs, files in os.walk(DIR):
    for f in files:
        if not f.endswith('.html'): continue
        if f == '.fix-paths.py': continue
        fp = os.path.join(root, f)
        # 计算当前文件相对于 DIR 的路径深度
        rel = os.path.relpath(fp, DIR)
        depth = len(rel.replace('\\', '/').split('/')) - 1  # 0 = 根目录, 1 = surface/ 等
        
        with open(fp, 'r', encoding='utf-8') as fh:
            content = fh.read()
        original = content
        
        for page in SURFACE_PAGES:
            # 匹配 page.html 的各种引用模式
            patterns = [
                f"href='{page}.html'", f'href="{page}.html"',
                f"\\('{page}.html'",   f'("{page}.html"',
            ]
            for pat in patterns:
                pass  # 实际实现需要处理不同 depth 的前缀
            
        # 写入
        if content != original:
            with open(fp, 'w', encoding='utf-8') as fh:
                fh.write(content)
```

- [ ] **步骤 2：运行脚本验证**

```bash
cd "E:\claude code\room46_v2" && python .fix-paths.py
```

**注意：** 此脚本的实际实现必须处理三种文件位置：
1. 根目录文件 → 引用 surface/ 页面时加 `surface/` 前缀
2. `surface/` → 引用根目录文件时加 `../` 前缀
3. `inner/` 或 `ending/` → 引用根目录加 `../`，引用 surface/ 加 `../surface/`

---

### 任务 2：迁移已有页面到 surface/ 目录

**文件：**
- 移动：所有非 forum.html 的 HTML 文件 → `surface/`
- 创建：`E:\claude code\room46_v2\surface\` 目录

- [ ] **步骤 1：创建 surface/ 目录并移动文件**

```bash
mkdir -p "E:\claude code\room46_v2\surface"
cd "E:\claude code\room46_v2"
# 移动所有 HTML 文件（除了 forum.html 和 .fix-*.py）
for f in *.html; do
  if [ "$f" != "forum.html" ]; then
    mv "$f" surface/
    echo "移动: $f → surface/"
  fi
done
```

- [ ] **步骤 2：创建 inner/ 和 ending/ 目录**

```bash
mkdir -p "E:\claude code\room46_v2\inner"
mkdir -p "E:\claude code\room46_v2\ending"
```

- [ ] **步骤 3：运行链接修复脚本**

```bash
cd "E:\claude code\room46_v2" && python .fix-paths.py
```

- [ ] **步骤 4：验证链接完整性**

```bash
# 检查所有文件中是否有指向不存在的 .html 的链接
cd "E:\claude code\room46_v2"
grep -r "href='[^']*\.html'" --include="*.html" | grep -v "http" | head -20
```

---

### 任务 3：构建 inner/index.html — 里论坛首页

**文件：**
- 创建：`E:\claude code\room46_v2\inner\index.html`

**设计：**
- 暗色背景（#0A0A0A 或 #111）
- 红色/暗红文字（#CC0000 / #8B0000）
- 等宽字体，终端/控制台风格
- 顶部显示 "LAMP46 PROTOCOL INTERFACE"
- 帖子列表为加密/乱码风格的条目
- 6-8 个伪帖子条目，部分可点击跳转到其他 inner 页面
- 右上角数字时钟倒计时

**内容规模：** 15KB+

- [ ] **步骤 1：编写 inner/index.html**

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>◈ 回声 · 里 · LAMP46</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{font:12px/1.6 "Courier New",monospace;background:#0A0A0A;color:#8B0000}
/* ... 完整实现 15KB+ ... */
</style>
</head>
<body>
<!-- 完整内容 -->
</body>
</html>
```

（实际编写时包含完整的内容、帖子条目、导航链接）

- [ ] **步骤 2：验证页面可访问**

--- 以下任务结构类似，每页 15KB+ ---

### 任务 4：构建 inner/v47-room.html + inner/lamp46.html

**文件：**
- 创建：`E:\claude code\room46_v2\inner\v47-room.html`
- 创建：`E:\claude code\room46_v2\inner\lamp46.html`

**v47-room.html 内容：**
- V47 的个人空间/工作台
- 墙上的便签、照片、文件扫描件占位
- CRT 终端屏幕显示日志
- 关键词："wreckage" "46号房间" "anchor"

**lamp46.html 内容：**
- LAMP46 协议监控终端
- 实时文字流（JavaScript 模拟）
- 数据显示面板
- 关键词："1975-11-04" "ANCHOR_0" "PROTOCOL_VERSION_46"

- [ ] **步骤 1：编写 inner/v47-room.html**（15KB+）
- [ ] **步骤 2：编写 inner/lamp46.html**（15KB+）

---

### 任务 5：构建 inner/protocol.html + inner/anchor-zero.html

**文件：**
- 创建：`E:\claude code\room46_v2\inner\protocol.html`
- 创建：`E:\claude code\room46_v2\inner\anchor-zero.html`

**protocol.html 内容：**
- 协议日志查看器，按时间倒序
- 条目从 2004 年追溯到 1975 年
- 日志内容逐条揭示 Room46 的起源
- 部分日志被涂黑/损坏

**anchor-zero.html 内容：**
- 锚点零号 · ARPANET 时代文档
- 1975 年 11 月 4 日的原始协议文档
- 风格类似老式学术论文/技术报告
- 揭示 Room46 最初是 ARPANET 的"通信协议实验"

- [ ] **步骤 1：编写 inner/protocol.html**（15KB+）
- [ ] **步骤 2：编写 inner/anchor-zero.html**（15KB+）

---

### 任务 6：构建 inner/revelation.html + inner/transition.html

**文件：**
- 创建：`E:\claude code\room46_v2\inner\revelation.html`
- 创建：`E:\claude code\room46_v2\inner\transition.html`

**revelation.html 内容：**
- 真相揭示页面
- LAMP46 系统的完整解释
- Room46 的本质：一个寄生于 DNS 层的数字实体
- 它是 ARPANET 的遗留协议，在互联网中游荡
- 需要"宿主"来维持存在
- 论坛就是它的宿主

**transition.html 内容：**
- 过渡/走廊页面
- 心理恐怖风格
- 无限循环的文字
- 通往结局的选择点

- [ ] **步骤 1：编写 inner/revelation.html**（15KB+）
- [ ] **步骤 2：编写 inner/transition.html**（15KB+）

---

### 任务 7：构建结局页面（3 页）

**文件：**
- 创建：`E:\claude code\room46_v2\ending\gatekeeper.html`
- 创建：`E:\claude code\room46_v2\ending\burn.html`
- 创建：`E:\claude code\room46_v2\ending\escape.html`

**gatekeeper.html — 守门人结局：**
- 玩家选择成为 Room46 的新守护者
- 风格：仪式感、沉重、循环
- 最后一行："你成为了第 47 任守门人。"
- 页面在 46 秒后自动淡出到黑屏

**burn.html — 焚烧结局：**
- 玩家选择摧毁 Room46
- 风格：激烈、燃烧、崩坏
- 文字逐渐碎裂/乱码
- 最后："它死了。你自由了。"
- 屏幕闪烁后变白

**escape.html — 逃离结局：**
- 玩家选择切断联系，回归正常生活
- 风格：疏离、平静、不安
- 回到一个"正常"的论坛页面
- 但角落里永远有一个 ◈ 符号

- [ ] **步骤 1：编写 ending/gatekeeper.html**（15KB+）
- [ ] **步骤 2：编写 ending/burn.html**（15KB+）
- [ ] **步骤 3：编写 ending/escape.html**（15KB+）

---

### 任务 8：清理和最终验证

- [ ] **步骤 1：删除临时脚本**

```bash
cd "E:\claude code\room46_v2"
rm -f .fix-paths.py
```

- [ ] **步骤 2：验证所有页面可访问**

```bash
cd "E:\claude code\room46_v2"
# 检查所有 .html 链接目标是否存在
grep -roh "href='[^']*\.html'" --include="*.html" | sort -u | while read link; do
  file=$(echo "$link" | sed "s/href='//" | sed "s/'//")
  if [ ! -f "$file" ]; then
    echo "❌ 缺失: $file"
  fi
done
```

- [ ] **步骤 3：列出最终目录结构**

```bash
cd "E:\claude code\room46_v2"
find . -name "*.html" | sort
```
