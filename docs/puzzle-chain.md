# Room46 · 解密逻辑与碎片化信息链

> 本文档记录 Room46 的完整解密逻辑：玩家从第一步到最后一步需要发现什么、推理什么、搜索什么。
> 所有关键词来源、密码线索位置、页面间跳转关系全部在此。

---

## 一、核心解密机制

游戏使用四种主要交互方式：
1. **点击** — 论坛帖子列表中的可见链接
2. **页面内搜索** — 在帖子页面的搜索框输入关键词 → 跳转解码页
3. **论坛全局搜索** — 在 `forum.html` 搜索框输入关键词 → 跳转恐怖页/入口页
4. **登录系统** — 使用发现的用户名和密码登录 → 查看私信和草稿

---

## 二、完整解密链

### 🔷 阶段 1：表论坛漫游（自由探索）

玩家打开 `forum.html`，看到 4 个版块和帖子列表。

#### 可点击进入的帖子：

| 页面路径 | 获取的关键信息 |
|---------|--------------|
| `surface/rules.html` | ① 摩斯码装饰（第4条规则末尾）② 园丁回复"排版装饰而已"（此地无银）③ 深海鱼回复中提及"46号房间" ④ 解密大师回复问"那些点和划是啥" |
| `surface/newbie.html` | ① 解密大师回复："我发过一些编码相关的帖子"（暗示有加密内容）② 深海鱼回复："归档区有些旧帖子" |
| `surface/echo.html` | ① 失眠患者_23发的摩斯码 ② 解密大师解码出WATCHING ③ **玩家在此页搜索"回响"/"WATCHING"→ decode-morse.html** |
| `surface/browser.html` | ① 夜行客描述黑页和倒计时 ② HTML注释中有Base64 ③ **玩家在此页搜索"V4cXy"→ decode-base64.html** |
| `surface/dream.html` | ① 深海鱼的倒序文字 ② 解密大师解码"那扇门就在你眼前" ③ **玩家在此页搜索"永远不会醒来"→ decode-reverse.html** |
| `surface/food.html` | **密码提示**：咸鱼一条回复说"解密大师的密码不会就是cipher123吧" |
| `surface/movie.html` | 灌水，无关键产出 |
| `surface/travel.html` | 灌水，无关键产出 |
| `surface/diary.html` | 灌水，无关键产出 |
| `surface/tech.html` | 灌水，无关键产出 |
| `surface/router.html` | 灌水，无关键产出 |
| `surface/suzhou.html` | 灌水，无关键产出 |
| `surface/moon.html` | 灌水，无关键产出 |

#### 其他可见功能：

| 页面 | 获取的关键信息 |
|------|--------------|
| `forum.html` 统计横幅 | "您上次访问时间：2004-06-01" → 这个日期是管理员密码 |
| `forum.html` 广告弹窗 | "用户名：V47，密码已过期46年" → V47账号存在 |
| `forum.html` 归档区 | "站务管理"（需管理员权限） |

---

### 🔷 阶段 2：解码页（页面内搜索触发）

#### decode-morse.html
- **入口：** 在 `surface/echo.html` 搜索"回响"或"WATCHING"
- **解密过程：** JS动画逐字符解码摩斯码
- **解码结果：** `WATCHING`
- **揭示：** "它在看着你" + "去看看论坛成员们的个人主页"
- **关键词产出：** `WATCHING`（可用于论坛全局搜索）
- **控制台：** `console.log('◈ 摩斯解码完成。信号源：echo.html 帖子 #1。')`

#### decode-base64.html
- **入口：** 在 `surface/browser.html` 搜索"V4cXy"
- **解密过程：** JS动画显示解码步骤
- **解码结果：** `V47 left you a clue. Search "V4cXy".`
- **教学：** Base64编码原理，教玩家怎么识别Base64
- **揭示：** "去他的个人主页看看：profile.html?user=V47"
- **关键词产出：** `V47`（可用于论坛全局搜索）
- **控制台：** `console.log('◈ Base64 解码完成。线索指向：V47 -> V4cXy -> ?')`

#### decode-reverse.html
- **入口：** 在 `surface/dream.html` 搜索"永远不会醒来"或"那扇门"
- **解密过程：** JS将每行反转
- **解码结果：** "那扇门就在你眼前。不管你信不信，你已经不是你自己了。太晚了——那扇门也已经打开了。"
- **揭示：** "门已经打开了。你还能关上它吗？有些门不是用钥匙打开的。"
- **关键词产出：** `那扇门`（可用于论坛全局搜索）

#### decode-caesar.html
- **入口：** 未直接链接，玩家在里论坛发现凯撒密码后来此
- **功能：** 凯撒密码交互式解码器，偏移量滑块 1-25
- **提示：** "在里论坛的某处，有一段文字使用了凯撒密码。偏移量……你会在观察日志中找到它。"
- **控制台：** `console.log('◈ 凯撒密码终端就绪。偏移量 +6 是钥匙。')`

---

### 🔷 阶段 3：论坛全局搜索触发（关键词→隐藏页）

玩家在 `forum.html` 搜索已发现的关键词，触发心理恐怖页或入口页：

| 搜索关键词 | 跳转路径 | 触发条件/来源 |
|-----------|---------|-------------|
| `WATCHING` | `blank/blank-watching.html` | 从 decode-morse 获得 |
| `V47` | `blank/blank-v47.html` | 从 decode-base64 或广告弹窗获得 |
| `46号房间` | `blank/blank-room.html` | 从 rules.html 深海鱼回复获得 |
| `那扇门` | `blank/blank-door.html` | 从 decode-reverse 获得 |
| `镜像` / `倒影` | `blank/blank-mirror.html` | 从里论坛概念获得 |
| `46MHz` / `信号` | `blank/blank-signal.html` | 发现 46Hz/46MHz 概念后 |
| `遗忘` | `blank/blank-forgotten.html` | 探索中偶然触发 |
| `Outsider` / `残骸` | `blank/blank-cipher.html` | 从 out_sider 用户名推理 |
| `46` | `blank/blank-numbers.html` | 探索中偶然触发 |
| `站务管理` | `surface/admin.html` | 管理员专用（从归档区点击进入，但需已登录） |
| `ANCHOR_0` / `anchor_0` | `gateway/key-gate.html` | 从 admin 面板 LAMP46 日志发现 |

**⚠ 注意：** 搜索不匹配的关键词会随机跳到灌水帖（rules/food/tech/movie/travel/diary）。

---

### 🔷 阶段 4：密码发现链

#### 密码获取方式总览

所有密码在**公开可见的页面**中以伪装成闲聊/玩笑的方式提示：

| 用户名 | 密码 | 提示位置 | 提示内容 |
|--------|------|---------|---------|
| V47 | `wreckage46` | ① 广告弹窗（用户名V47，密码隐藏）② rules.html 回复"他的账号……像废墟一样" ③ echo.html 控制台"废墟中的第46号" | wreckage(废墟)+46 |
| 深海鱼 | `deepfish46` | ① dream.html 失眠患者_23回复"密码不会就是你名字加46吧哈哈哈哈" ② 深海鱼签名"连续46天做同一个梦" | deepfish(深海鱼)+46 |
| 夜行客 | `night046` | ① browser.html 匿名用户回复"夜里走的人，密码也带着夜" ② 夜行客签名"总有人要在夜里走路" | night(夜)+046 |
| 解密大师 | `cipher123` | ① food.html 咸鱼一条回复"解密大师的密码不会就是cipher123吧" ② 解密大师简介"密码是用来让别人发现东西的" | cipher(密码)+123 |
| out_sider | `outsider2009` | ① 用户名 out_sider 本身暗示 ② newbie.html 深海鱼回复"局外人你什么时候注册的？09年？" | outsider(局外人)+2009 |
| **园丁（管理员）** | **`20040601`** | **论坛统计横幅显示"您上次访问时间：2004-06-01"** + 各用户草稿中确认 | 论坛上线日期 |

#### 登录后的关键产出

| 登录为 | 草稿/私信内容 | 获取的关键信息 |
|-------|--------------|--------------|
| V47 | 草稿："密码是论坛上线的日期。20040601" | 管理员密码 |
| 解密大师 | 草稿：LAMP46协议分析笔记 + "管理员密码：20040601" | 管理员密码 + LAMP46概念 |
| 深海鱼 | 梦境记录 | 暗示里论坛存在 |
| 夜行客 | 浏览器观察记录 | DNS异常记录 |
| out_sider | V47的最后消息："我要去关掉它了" | 剧情推进 |
| **园丁（admin）** | **可进入 admin.html 面板** | 查看被删帖、LAMP46监控 |

---

### 🔷 阶段 5：管理员面板→里论坛入口

#### admin.html（需登录为园丁）

| 面板 | 关键信息 |
|------|---------|
| 概览 | 异常帖子 46 篇 / 隐藏版块 46 个 |
| 用户管理 | V47 状态：**异常** |
| 帖子管理 | **被删帖缓存 #1：** V47被删的帖子——提到"46号房间"路径、Base64解码出"ANCHOR_0"、0.046秒后被系统删除 |
| LAMP46监控 | 启动终端 → 显示协议数据 |
| 系统日志 | 时间线 2004-05-31 到 2009-06-15 |

#### 从 admin 到 key-gate 的路径

1. 在 admin.html 的 LAMP46 面板中看到关键词 `ANCHOR_0`
2. 在 `forum.html` 搜索 `ANCHOR_0` → `gateway/key-gate.html`
3. 在 key-gate 输入密码 `46Hz`（密码提示在 blank-signal.html 的"46Hz是关闭它的密钥"，或实验记录）
4. 正确后跳转 `inner/index.html`

---

### 🔷 阶段 6：里论坛解密

#### inner/index.html —— 里论坛入口

```
输入 help → 显示命令列表
输入 status → 协议状态（活跃、锚点1、宿主回声茶馆）
输入 anchor → 锚点信息（1975-11-04，ARPANET节点#46）
输入 hosts → 宿主列表摘要（5任宿主）
输入 46 → 特殊消息
```

所有 inner 内的帖子页链接都指向里论坛内部。

#### 里论坛密码室挑战

**前提：** 在 `inner/observation-log.html` 底部发现凯撒密码密文：
```
Xk gszmp hszr xl lmtvihy zx xzkviv-gsz nvih. Tsv hrew ivwsvwsvih ziv gsviv.
```

**解码过程：** 偏移量 +6（控制台提示"凯撒密码偏移量：G→A 是 6"）

**解码结果：** `You stand now at the entrance of the cipher-chamber. The keys are everywhere.`

**解锁后：** 跳转到 `inner/core.html`

---

### 🔷 阶段 7：档案密码收集

在 `inner/archives.html` 有 5 个加密档案，需要从各处收集密码：

| 档案 | 密码 | 从哪获得 |
|------|------|---------|
| 档案#1 — 起源 | `1975` | `terminal.html` 中输入 ANCHOR 命令 → "原始上线：1975-11-04" |
| 档案#2 — ARPANET | `ARPANET` | `observation-log.html` 中日志提到 ARPANET 节点 |
| 档案#3 — 频率 | `HZ` | `experiment.html` 中频率研究章节 |
| 档案#4 — WATCHING | `WATCHING` | `decode-morse.html` 解码结果 |
| 档案#5 — 关闭协议 | `46Hz` | `key-gate.html` 通行密码 + `blank-signal.html` 提示 |

5 个档案全部解锁后揭示 Room46 的完整历史。

---

### 🔷 阶段 8：结局分歧

在 `inner/confrontation.html`，玩家做出最终选择：

| 选择 | 结局路径 | 结局概述 |
|------|---------|---------|
| [1] 我留下 | `ending/gatekeeper.html` | 成为第47任守门人，永远留在46号房间 |
| [2] 我关掉你 | `ending/burn.html` | 输入46Hz关闭信号，协议终止 |
| [3] 我离开 | `ending/escape.html` | 回到"正常"论坛，但◈永远跟着你 |
| [4] 我接受你（隐藏） | `ending/merge.html` | 与Room46融合，成为它的一部分 |

---

## 三、完整页面跳转图

```
forum.html（入口）
  │
  ├─点击帖子列表──────────────────────────────────────┐
  │  ├→ surface/rules.html → (发现摩斯码 + 46号房间)   │
  │  ├→ surface/newbie.html → (发现编码帖子)           │
  │  ├→ surface/echo.html → 搜"回响"                  │
  │  ├→ surface/browser.html → 搜"V4cXy"              │
  │  ├→ surface/dream.html → 搜"永远不会醒来"          │
  │  ├→ 灌水帖 (password hints分布在各处)               │
  │  └→ surface/login.html + profile.html             │
  │                                                    │
  ├─搜索关键词─────────────────────────────────────────┐
  │  ├→ WATCHING → blank/blank-watching.html           │
  │  ├→ V47 → blank/blank-v47.html                     │
  │  ├→ 46号房间 → blank/blank-room.html               │
  │  ├→ 那扇门 → blank/blank-door.html                 │
  │  ├→ ANCHOR_0 → gateway/key-gate.html ←───────┐    │
  │  └→ 其他 → blank/*                              │    │
  │                                                  │    │
  ├─登录→ surface/admin.html → LAMP46面板─────────────┘    │
  │  → 发现 ANCHOR_0 关键词 → 搜索→ key-gate             │
  │                                                      │
  └→ key-gate.html 输入"46Hz" → inner/index.html        │
       │                                                 │
       ├─帖子页──────────────────────────────────────────┐│
       │  inner/rules, echo, dream, browser... ←镜像版本  ││
       │                                                  ││
       ├─叙事页──────────────────────────────────────────┘│
       │  terminal → ANCHOR → "1975"（档案#1密码）        │
       │  observation-log → 凯撒密文 → 偏移+6 → "cipher"  │
       │  experiment → "HZ"（档案#3密码）                  │
       │  cipher-chamber → 解密成功 → 进入核心             │
       │  archives → 5档案全部解锁 → 完整故事              │
       │  hosts → 宿主名单（第46行=你）                    │
       │  core → Room46的意识流                           │
       │  memory-fragments → 记忆碎片（剧情）              │
       │                                                  │
       ├→ confrontation.html ─── 4个选择 ────────────────┤
       │                                                  │
       └→ ending/gatekeeper.html                          │
       → ending/burn.html                                 │
       → ending/escape.html                               │
       → ending/merge.html（隐藏）                         │
```

---

## 四、碎片化信息分布策略

| 信息碎片 | 分布在 | 拼合后得到 |
|---------|--------|-----------|
| V47的密码线索 | ①广告弹窗 ②rules回复 ③echo控制台 + 自身草稿 | wreckage46 |
| 深海鱼的密码线索 | ①dream回复 ②签名档 | deepfish46 |
| 夜行客的密码线索 | ①browser回复 ②签名档 | night046 |
| 解密大师的密码线索 | ①food回复 ②个人简介 | cipher123 |
| out_sider的密码线索 | ①用户名 ②newbie回复 | outsider2009 |
| 管理员密码 | ①统计横幅日期 ②V47草稿确认 ③解密大师草稿确认 | 20040601 |
| 摩斯密码解码 | echo.html正文 | WATCHING |
| Base64解码 | browser.html注释→decode-base64 | V47→V4cXy |
| 反转文字解码 | dream.html正文 | "那扇门"概念 |
| ANCHOR_0 | admin面板→被删帖缓存→LAMP46日志 | 通往里论坛的路 |
| 46Hz | blank-signal.html + experiment.html | key-gate通行码 |
| 档案#1密码1975 | terminal→ANCHOR命令 | 解锁档案#1 |
| 档案#2密码ARPANET | observation-log日志 | 解锁档案#2 |
| 档案#3密码HZ | experiment频率研究 | 解锁档案#3 |
| 档案#4密码WATCHING | 解码页 | 解锁档案#4 |
| 档案#5密码46Hz | key-gate通行码 | 解锁档案#5 |
| 凯撒偏移量6 | observation-log底部+控制台 | cipher-chamber挑战 |

---

## 五、各用户账号已知信息汇总

| 用户 | 密码 | 角色 | 草稿/私信关键内容 |
|------|------|------|-----------------|
| 园丁 | 20040601 | admin | 关于V47和46号房间的笔记 |
| admin | admin46 | admin | 备用账号 |
| V47 | wreckage46 | user | 管理员密码提示 |
| 深海鱼 | deepfish46 | user | 梦境记录 |
| 夜行客 | night046 | user | 浏览器观察记录 |
| 解密大师 | cipher123 | user | LAMP46分析笔记 |
| out_sider | outsider2009 | user | V47的最后消息 |

---

## 六、搜索完整关键词表

### forum.html 全局搜索可触发
| 关键词 | 跳转 | 页面类型 |
|--------|------|---------|
| WATCHING | blank/blank-watching.html | 👻 恐怖页 |
| V47 | blank/blank-v47.html | 👻 恐怖页 |
| 46号房间 | blank/blank-room.html | 👻 恐怖页 |
| 那扇门 | blank/blank-door.html | 👻 恐怖页 |
| 镜像 / 倒影 | blank/blank-mirror.html | 👻 恐怖页 |
| 46MHz / 信号 | blank/blank-signal.html | 👻 恐怖页 |
| 遗忘 | blank/blank-forgotten.html | 👻 恐怖页 |
| Outsider / 残骸 | blank/blank-cipher.html | 👻 恐怖页 |
| 46 | blank/blank-numbers.html | 👻 恐怖页 |
| 站务管理 | surface/admin.html | ⚙️ 功能页（需已登录） |
| anchor_0 / ANCHOR_0 | gateway/key-gate.html | 🔑 入口页 |

### 各页面内搜索可触发
| 页面 | 搜索词 | 跳转 |
|------|--------|------|
| surface/echo.html | 回响 / WATCHING / SOS | decode/decode-morse.html |
| surface/browser.html | V4cXy | decode/decode-base64.html |
| surface/dream.html | 永远不会醒来 / 那扇门 | decode/decode-reverse.html |

---

## 七、尚未埋入的内容（待补）

以下内容根据 `docs/game-flow.md` 规划但尚未实现，需要在各页面中添加：

- [ ] echo.html 回复中加入 WATCHING→回音对话的暗线
- [ ] rules.html 控制台输出指向profile页面
- [ ] browser.html 匿名用户回复暗示夜行客密码
- [ ] dream.html 失眠患者_23回复暗示深海鱼密码
- [ ] food.html 咸鱼一条回复暗示解密大师密码
- [ ] newbie.html 深海鱼回复暗示out_sider密码
- [ ] 各控制台输出（console.log）补充完整
