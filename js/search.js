/* ── Room46 统一搜索系统 v4 (2026-07-06) ── */
/* 每个关键词必须出现在对应页面的可见文字中 */

var SEARCH_MAP = {
  // == 第2阶段: 解码页 ==
  '回音':         'decode/decode-morse.html',
  'WATCHING':     'decode/decode-morse.html',
  'V4cXy':        'decode/decode-base64.html',
  '永远不会醒来': 'decode/decode-reverse.html',

  // == 第3阶段: 恐怖页 ==
  'V47':          'blank/blank-v47.html',
  '46号房间':     'blank/blank-room.html',
  'Room46':       'blank/blank-room.html',
  '这扇门':       'blank/blank-door.html',
  '镜像':         'blank/blank-mirror.html',
  '倒影':         'blank/blank-mirror.html',
  '正反':         'blank/blank-mirror.html',
  '46Hz':        'blank/blank-signal.html',
  '信号':         'blank/blank-signal.html',
  '遗忘':         'blank/blank-forgotten.html',
  'Outsider':     'blank/blank-cipher.html',
  '残骸':         'blank/blank-cipher.html',
	  '观看':         'blank/blank-watching.html',
	  '看':           'blank/blank-watching.html',
  '46':           'blank/blank-numbers.html',

  // == 第5阶段: 管理员 / 用户档案 ==
  '站务管理':     'surface/admin.html',

  '宿主':         'inner/hosts.html',
  'ANCHOR_0':     'gateway/key-gate.html',
  'anchor_0':     'gateway/key-gate.html',

  // == 钥匙与出口 ==
  '钥匙':         'inner/keys.html',
  '遗忘之路':     'ending/escape.html',
  '搜索出口':     'inner/exit.html',
  '出口':         'inner/exit.html',

  // == V47 / 自毁 ==
  'Detachment':   'ending/burn.html',

  // == 融合结局 ==
  '第46条':       'ending/merge.html',
};

/* ── 计算相对路径 ── */
function getSearchPrefix() {
  var path = window.location.pathname;
  // 检测是否在子目录中（适配 web 和 file:// 协议）
  var dirs = ['/surface/', '/decode/', '/blank/', '/gateway/', '/inner/', '/ending/'];
  for (var i = 0; i < dirs.length; i++) {
    if (path.indexOf(dirs[i]) !== -1) return '../';
  }
  return '';
}

/* ── 搜索历史 ── */
function addSearchHistory(keyword, target) {
  try {
    var history = JSON.parse(localStorage.getItem('echo_search_history') || '[]');
    // 去重：移除相同关键词的旧记录
    history = history.filter(function(h) { return h.keyword !== keyword; });
    history.unshift({keyword:keyword, target:target, time:new Date().toLocaleString()});
    if (history.length > 20) history = history.slice(0, 20);
    localStorage.setItem('echo_search_history', JSON.stringify(history));
    renderSearchHistory();
  } catch(e) {}
}

function renderSearchHistory() {
  var list = document.getElementById('search-history-list');
  var panel = document.getElementById('search-history');
  if (!list || !panel) return;
  try {
    var history = JSON.parse(localStorage.getItem('echo_search_history') || '[]');
    if (history.length === 0) { panel.style.display = 'none'; return; }
    panel.style.display = 'block';
    list.innerHTML = history.map(function(h) {
      return '<div class="entry"><span class="keyword">' + h.keyword + '</span> → <span class="found">' + h.target + '</span> <span style="color:#ccc;font-size:9px;">' + h.time + '</span></div>';
    }).join('');
  } catch(e) {}
}

/* ── 安全导航（兼容 file:// 协议）── */
function safeNavigate(url) {
  // 用真实 <a> 点击导航，避免 file:// 下的跨源警告
  var a = document.createElement('a');
  a.href = url;
  a.style.display = 'none';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

/* ── 统一搜索 ── */
function doSearch() {
  var input = document.getElementById('search-input');
  if (!input) return;
  var q = input.value.trim();
  if (!q) return;
  var prefix = getSearchPrefix();
  var ql = q.toLowerCase();
  var url = '' + window.location;

  // 特殊分流：深海鱼 — 表论坛搜去 surface, 里论坛搜去 inner
  if (ql.indexOf('深海鱼') !== -1) {
    var isInner = url.indexOf('/inner/') !== -1;
    var target = isInner ? 'inner/deepseafish.html' : 'surface/deepseafish.html';
    addSearchHistory(q, target);
    safeNavigate(prefix + target);
    return;
  }

  // 特殊分流：Intuitive — 仅限 inner
  if ((ql.indexOf('intuitive') !== -1 || ql.indexOf('直觉') !== -1)) {
    if (url.indexOf('/inner/') !== -1) {
      addSearchHistory(q, 'intuitive.html');
      safeNavigate('../inner/intuitive.html');
      return;
    }
  }

  // 特殊分流：自己 — 仅限 inner
  if (ql.indexOf('自己') !== -1) {
    if (url.indexOf('/inner/') !== -1) {
      addSearchHistory(q, 'self.html');
      safeNavigate('../inner/self.html');
      return;
    }
  }

  var keys = Object.keys(SEARCH_MAP).sort(function(a,b){return b.length - a.length;});
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    var kl = key.toLowerCase();
    if (ql.indexOf(kl) !== -1) {
      addSearchHistory(q, SEARCH_MAP[key]);
      safeNavigate(prefix + SEARCH_MAP[key]);
      return;
    }
  }
  try {
    showModal('🔍', '未找到「' + q + '」<br><br>换个词搜搜看吧～');
  } catch(e) {
    alert('未找到「' + q + '」。换个词搜搜看吧～');
  }
}

/* ── 搜索按钮点击计数（inner 5次彩蛋）── */
var _searchClickCount = 0;

/* ── 初始化 ── */
function initSearch() {
  var input = document.getElementById('search-input');
  var btn = document.getElementById('search-btn');
  if (input && btn) {
    if (input._listenerAttached) return;
    input._listenerAttached = true;
    btn.addEventListener('click', function(){
      // 点击计数（仅 inner）
      if (getSearchPrefix() === '../') {
        _searchClickCount++;
        if (_searchClickCount >= 5) {
          _searchClickCount = -999; // 防止重复触发
          // 新标签页打开
          var a = document.createElement('a');
          a.href = '../inner/eye.html';
          a.target = '_blank';
          a.style.display = 'none';
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          return;
        }
      }
      doSearch();
    });
    input.addEventListener('keydown', function(e) { if (e.key === 'Enter') doSearch(); });
  }
  renderSearchHistory();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', function() {
    initSearch();
    injectPageLabel();
  });
} else {
  initSearch();
  injectPageLabel();
}

/* ═════════════════════════════════════════
   页面标签系统 · 右下角序号
   主线按顺序编号 X/TOTAL
   extra / easter egg 独立标注
   ═════════════════════════════════════════ */

/* ── 主线页面顺序（按剧情推进排列）── */
var STORY_ORDER = [
  // 第〇章：入口
  'forum.html',                       //  1
  'surface/rules.html',               //  2

  // 第一章：表论坛谜题
  'surface/echo.html',                //  3
  'surface/browser.html',             //  4
  'surface/dream.html',               //  5

  // 解码阶段
  'decode/decode-morse.html',         //  6
  'decode/decode-base64.html',        //  7
  'decode/decode-reverse.html',       //  8
  'decode/decode-caesar.html',        //  9

  // 第二章：空白虚空
  'blank/blank-v47.html',             // 10
  'blank/blank-room.html',            // 11
  'blank/blank-door.html',            // 12
  'blank/blank-watching.html',        // 13
  'blank/blank-signal.html',          // 14
  'blank/blank-forgotten.html',       // 15
  'blank/blank-cipher.html',          // 16
  'blank/blank-numbers.html',         // 17

  // 管理员阶段
  'surface/admin.html',               // 18

  // 第三章：网关
  'gateway/key-gate.html',            // 19

  // 第四章：里论坛
  'inner/index.html',                 // 20
  'inner/rules.html',                 // 21
  'inner/echo.html',                  // 22
  'inner/dream.html',                 // 23
  'inner/browser.html',               // 24
  'inner/diary.html',                 // 25
  'inner/newbie.html',                // 26
  'inner/food.html',                  // 27
  'inner/movie.html',                 // 28
  'inner/travel.html',                // 29
  'inner/router.html',                // 30
  'inner/archives.html',              // 31
                    // 32
  'inner/terminal.html',              // 33
        // 34
  'inner/admin.html','inner/hosts.html',                 // 35
  'inner/observation-log.html',       // 36
  'inner/experiment.html',            // 37
  'inner/cipher-chamber.html',        // 38
           // 39
                    // 40
  'inner/exit.html',                  // 41

  // 终章：结局
  'ending/burn.html',                 // 42
  'ending/escape.html',               // 43
  'ending/gatekeeper.html',           // 44
  'ending/merge.html',                // 45
];

var STORY_TOTAL = 45;

/* ── 额外/彩蛋页面映射（兜底用） ── */
var EXTRA_MAP = {
  'surface/login.html':               'extra',
  'surface/register.html':            'extra',
  'surface/faq.html':                 'extra',
  'surface/newbie.html':              'extra',
  'surface/food.html':                'extra',
  'surface/movie.html':               'extra',
  'surface/travel.html':              'extra',
  'surface/suzhou.html':              'extra',
  'surface/moon.html':                'extra',
  'surface/diary.html':               'extra',
  'surface/tech.html':                'extra',
  'surface/router.html':              'extra',
  'surface/drafts.html':              'extra',
  'surface/profile.html':             'extra',
  'surface/deepseafish.html':         'extra',
  'inner/deepseafish.html':           'extra',
  'inner/self.html':                  'easter egg',
  'inner/eye.html':                   'easter egg',
  'blank/blank-mirror.html':          'easter egg',
};

/* ── 所有页面统一顺序（表论坛→里论坛→最后记录） ── */
var ALL_PAGES = [
  // === 表论坛（21页 + forum.html） ===
  'forum.html',
  'surface/rules.html','surface/newbie.html','surface/echo.html','surface/dream.html',
  'surface/food.html','surface/movie.html','surface/travel.html','surface/diary.html',
  'surface/tech.html','surface/browser.html','surface/router.html',
  'surface/moon.html','surface/suzhou.html','surface/faq.html',
  'surface/login.html','surface/register.html','surface/drafts.html','surface/profile.html',
  'surface/deepseafish.html','surface/admin.html',
  // === 里论坛（29页） ===
  'inner/index.html','inner/rules.html','inner/newbie.html','inner/echo.html','inner/dream.html',
  'inner/food.html','inner/movie.html','inner/travel.html','inner/diary.html',
  'inner/tech.html','inner/browser.html','inner/router.html',
  'inner/garden.html','inner/moonlight.html',
  'inner/admin.html','inner/hosts.html','inner/terminal.html',
  'inner/archives.html','inner/observation-log.html','inner/experiment.html',
  'inner/cipher-chamber.html','inner/self.html',
  'inner/deepseafish.html','inner/eye.html',
  'inner/intuitive.html','inner/keys.html','inner/v47-message.html','inner/exit.html',
  // === 最后的记录 ===
  'surface/story.html'
];

/* ── 注入右下角标签 ── */
function injectPageLabel() {
  if (document.getElementById('page-label')) return;
  try {
    var url = '' + window.location;
    var filename = url.split('/').pop().split('?')[0].split('#')[0].toLowerCase();
    if (!filename) return;

    // 构造相对路径用于匹配
    var prefix = '';
    if (url.indexOf('/surface/') !== -1) prefix = 'surface/';
    else if (url.indexOf('/inner/') !== -1) prefix = 'inner/';
    else if (url.indexOf('/gateway/') !== -1) prefix = 'gateway/';
    else if (url.indexOf('/blank/') !== -1) prefix = 'blank/';
    else if (url.indexOf('/decode/') !== -1) prefix = 'decode/';
    else if (url.indexOf('/ending/') !== -1) prefix = 'ending/';
    var pageKey = prefix + filename;

    // 特殊目录：显示固定标签
    if (prefix === 'gateway/') { createLabel('路径', 'extra'); return; }
    if (prefix === 'blank/')   { createLabel('Blank', 'extra'); return; }
    if (prefix === 'decode/')  { createLabel('解码页', 'extra'); return; }
    if (prefix === 'ending/')  { createLabel('结局', 'egg'); return; }

    // 统一顺序查找
    for (var i = 0; i < ALL_PAGES.length; i++) {
      if (pageKey === ALL_PAGES[i]) {
        createLabel((i + 1) + ' / ' + ALL_PAGES.length, 'story');
        return;
      }
    }

    // 兜底：extra/egg 映射
    if (typeof EXTRA_MAP !== 'undefined') {
      for (var key in EXTRA_MAP) {
        var ef = key.split('/').pop().toLowerCase();
        if (filename === ef) {
          var grp = EXTRA_MAP[key] === 'extra' ? 'extra' : 'egg';
          createLabel(EXTRA_MAP[key], grp);
          return;
        }
      }
    }
  } catch(e) {}
}

/* ── 创建标签DOM ── */
function createLabel(text, group) {
  var isDark = window.location.href.indexOf('/inner/') !== -1 ||
               window.location.href.indexOf('/blank/') !== -1 ||
               window.location.href.indexOf('/gateway/') !== -1 ||
               window.location.href.indexOf('/ending/') !== -1;
  var label = document.createElement('div');
  label.id = 'page-label';
  label.textContent = text;
  label.style.cssText =
    'position:fixed !important;' +
    'bottom:10px !important;' +
    'right:10px !important;' +
    'z-index:999999 !important;' +
    'font:bold 11px/1 "Courier New",monospace !important;' +
    'letter-spacing:2px !important;' +
    'padding:5px 12px !important;' +
    'pointer-events:none !important;';

  if (group === 'story') {
    label.style.color = '#1A3050';
    label.style.background = 'rgba(240,240,245,0.85)';
    label.style.border = '1px solid rgba(180,190,200,0.5)';
    label.style.borderRadius = '2px';
  } else if (group === 'extra') {
    label.style.color = '#665544';
    label.style.background = 'rgba(245,240,235,0.85)';
    label.style.border = '1px solid rgba(200,190,180,0.4)';
    label.style.borderRadius = '2px';
  } else if (group === 'egg') {
    label.style.color = '#2D5A2D';
    label.style.background = 'rgba(235,245,235,0.85)';
    label.style.border = '1px solid rgba(180,210,180,0.4)';
    label.style.borderRadius = '2px';
  }

  // 暗色页面适配
  if (isDark) {
    if (group === 'story') {
      label.style.color = '#5588AA';
      label.style.background = 'rgba(10,10,10,0.75)';
      label.style.border = '1px solid rgba(50,60,70,0.4)';
    } else if (group === 'extra') {
      label.style.color = '#887766';
      label.style.background = 'rgba(10,10,10,0.6)';
      label.style.border = '1px solid rgba(60,50,40,0.3)';
    }
  }

  document.body.appendChild(label);
}
