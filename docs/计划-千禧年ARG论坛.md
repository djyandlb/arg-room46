# Room46 V2 · 千禧年论坛 ARG 设计计划

## 一、视觉风格：Y2K 论坛复古风

### 设计语言
- **参考原型：** phpBB 2.x / vBulletin 3.x / Discuz! 4.0 时代的论坛
- **底色：** `#E5E5E5` 或旧版 tiled 纹理
- **版块容器：** 白色 + 1px `#C0C0C0` 边框
- **顶栏：** 深蓝渐变 `#0D3050` → `#1A4A70`
- **版块标题栏：** `#1A4A70` 白字 bold
- **帖子标题：** 经典蓝链接 `#0000CC`，visited `#551A8B`
- **字体：** 11pt-12pt，sans-serif + monospace（代码块）
- **头像栏：** 左浮动，80x80 像素占位
- **签名档：** `<hr>` 分隔，斜体/小字
- **表格布局感：** 用 CSS 模拟 table 的视觉分割
- **页面体积：** 每页 15KB+ 内容

### 经典元素
- "您上次访问时间：YYYY-MM-DD HH:MM"
- 在线/离线状态绿点/灰点
- 发帖数、会员等级
- "IP 地址已记录"
- "此帖由 XXX 于 YYYY-MM-DD 最后编辑"
- 分页导航：« 上一页 · 1 2 3 ... 46 · 下一页 »
- Smilies 占位符
- [img] 标签占位风格

## 二、全页面清单

### 表论坛页面（约 13 页）

| 文件名 | 内容 | 功能 | 预估大小 |
|--------|------|------|---------|
| `index.html` | 论坛首页，版块列表 + 统计 | 入口 | ~18KB |
| `rules.html` | 版规帖 | 灌水/掩体 | ~15KB |
| `tech.html` | Chrome 卡顿讨论帖 | 灌水 | ~16KB |
| `food.html` | 红烧排骨菜谱帖 | 灌水 | ~15KB |
| `movie.html` | 冷门电影推荐帖 | 灌水 | ~15KB |
| `travel.html` | 大理游记帖 | 灌水 | ~15KB |
| `diary.html` | 流浪猫日记帖 | 灌水 | ~16KB |
| `newbie.html` | 新人报道帖（内含加密科普） | 教程帖 | ~18KB |
| `echo.html` | "我一直听到回声"帖 | 线索帖 #1 | ~18KB |
| `browser.html` | "浏览器自动打开陌生页面" | 线索帖 #2 | ~18KB |
| `dream.html` | "反复做同一个梦"帖 | 线索帖 #3 | ~18KB |
| `admin-archive.html` | 管理员后台·被删帖缓存 | 线索帖 #4 | ~20KB |
| `deleted-1.html` | 被删除的帖子#1 | 线索帖 #5 | ~17KB |

### 镜像/解码页面（约 6 页）

| 文件名 | 内容 | 到达方式 | 预估 |
|--------|------|---------|------|
| `mirror-forum.html` | 镜像论坛版块列表 | 密钥进入 | ~18KB |
| `cipher-1.html` | 凯撒密码解谜帖 | 搜索到 | ~16KB |
| `base64-hint.html` | Base64 隐藏信息页 | 解码到 | ~15KB |
| `reversed-thread.html` | 倒序文字帖 | 发现到 | ~16KB |
| `morse.html` | 摩斯密码解谜帖 | 解码到 | ~17KB |
| `key-gate.html` | 密钥总汇 + 里论坛入口 | 所有线索汇聚 | ~18KB |

### 里论坛页面（约 8 页）

| 文件名 | 内容 | 功能 | 预估 |
|--------|------|------|------|
| `inner-index.html` | 里论坛主页 | 里论坛入口 | ~18KB |
| `inner-v47.html` | V47 最后的帖子 | 核心叙事 | ~20KB |
| `inner-out-sider.html` | out_sider 的留言 | 核心叙事 | ~18KB |
| `inner-lamp46.html` | Lamp46 实验记录 | 背景揭露 | ~20KB |
| `inner-anchor.html` | 锚点列表 | 世界观 | ~18KB |
| `inner-protocol.html` | 协议文档 | 世界观 | ~22KB |
| `inner-zero.html` | 零号锚点档案 | 最终真相 | ~20KB |
| `inner-ending.html` | 通关页面 | 出口 | ~16KB |

### 其他（4 页）
| `register.html` | 注册页 | 灌水 | ~15KB |
| `faq.html` | 论坛帮助 | 灌水 | ~15KB |
| `404.html` | 页面不存在 | 装饰 | ~5KB |
| `js/engine.js` | 游戏引擎 | 搜索/解密/状态 | ~8KB |
| `css/forum.css` | 论坛样式 | Y2K 风格 | ~6KB |
| `css/inner.css` | 里论坛样式 | 阴森复古 | ~5KB |

## 三、解密链设计（核心）

### 整体流程

```
[ 表论坛探索 ]
   ↓ 浏览帖子，发现异常
[ 线索帖 #1 "echo" ] → 发现摩斯密码 → 解码得关键词
   ↓ 搜索关键词
[ 线索帖 #2 "browser" ] → 发现 Base64 → 解码得密钥片段
   ↓ 搜索关键词
[ 线索帖 #3 "dream" ] → 发现倒序文字 → 反转得线索
   ↓ 搜索关键词  
[ 管理员后台 ] → 发现被删帖缓存
   ↓ 查看被删帖
[ 被删帖 #1 ] → 凯撒密码 → 解码得隐藏信息
   ↓ 组合所有信息碎片
[ 密钥总汇 ] → 输入完整密钥 → 打开镜像论坛
   ↓ 
[ 镜像论坛 ] → 新的线索 → 进入里论坛
   ↓
[ 里论坛 ] → 全部真相
```

### 信息碎片分布

**摩斯密码线索出现在：**
- `echo.html` 帖子正文标点符号中隐藏的 `... --- ...`
- `dream.html` 用户签名档的 `. - . .`  
- `newbie.html` 版主回帖的日期格式隐藏

**Base64 出现在：**
- `browser.html` 源码注释
- `deleted-1.html` 被删帖的 meta 标签
- `admin-archive.html` 管理员备注

**凯撒密码出现在：**
- `deleted-1.html` 帖子标题
- `mirror-forum.html` 版块名称
- `inner-lamp46.html` 笔记本内容

**倒序文字出现在：**
- `dream.html` 楼主的回复中有一段反着写的
- `admin-archive.html` 管理日志的某一行

### 搜索词体系

```
关键词结构：（每一次搜索都返回大量信息，有用的线索埋在里面）

第一层（从帖子正文直接可找到）：
  "回声" / "echo" / "回响" → echo.html
  "浏览器" / "自动打开" → browser.html
  "梦" / "做梦" / "反复" → dream.html

第二层（需要解码后得到）：
  SOS（摩斯） → cipher-1.html
  base64 字符串 → base64-hint.html  
  倒序文字 → reversed-thread.html
  凯撒位移词 → cipher-1.html（另一段）

第三层（组合密钥）：
  密钥A + 密钥B + 密钥C → key-gate.html → 镜像论坛
```

### 防速通设计
- 关键剧情不直接写出来，只用"碎片"暗示
- 每个线索帖里 70% 灌水内容 + 30% 有用信息
- 需要组合至少 4-5 个信息碎片才能拼出完整的密钥
- 里论坛的内容分多层展开，不是一次性全给

## 四、构建顺序

1. **CSS 框架** → Y2K 论坛样式 + 里论坛样式
2. **JS 引擎** → 搜索/状态/进度存储
3. **index.html** → 论坛首页（表论坛）
4. **灌水帖 × 6** → rules/food/tech/movie/travel/diary
5. **教程帖** → newbie（加密科普）
6. **线索帖 × 3** → echo/browser/dream
7. **管理帖 × 2** → admin-archive/deleted-1
8. **解码页 × 4** → cipher/base64/reversed/morse
9. **密钥页** → key-gate
10. **镜像论坛** → mirror-forum
11. **里论坛 × 6** → inner-*
12. **收尾** → 404/register/faq
