/* ── Room46 结局追踪系统 ── */
/* 记录玩家解锁的结局，用于表论坛置顶帖和故事页面的解锁判断 */

var ENDINGS_MAP = {
  'burn':      '燃烧 · 一切归零',
  'escape':    '逃脱 · 那扇门的背后',
  'gatekeeper':'守门人 · 第47任',
  'merge':     '融合 · 第46条',
  'upload':    '上传 · 频率的彼端'
};

/* 标记一个结局为已解锁 */
function markEnding(id) {
  try {
    var raw = localStorage.getItem('echo_endings_unlocked');
    var list = raw ? JSON.parse(raw) : [];
    if (list.indexOf(id) === -1) {
      list.push(id);
      localStorage.setItem('echo_endings_unlocked', JSON.stringify(list));
    }
    return true;
  } catch(e) { return false; }
}

/* 获取已解锁结局列表 */
function getEndings() {
  try {
    var raw = localStorage.getItem('echo_endings_unlocked');
    return raw ? JSON.parse(raw) : [];
  } catch(e) { return []; }
}

/* 结局总数 */
function getEndingTotal() {
  return Object.keys(ENDINGS_MAP).length;
}

/* 已解锁数量 */
function getUnlockedCount() {
  return getEndings().length;
}

/* 是否全部解锁 */
function isAllEndingsUnlocked() {
  return getUnlockedCount() >= getEndingTotal();
}

/* 获取未解锁的结局列表 */
function getLockedEndings() {
  var all = Object.keys(ENDINGS_MAP);
  var unlocked = getEndings();
  return all.filter(function(e) { return unlocked.indexOf(e) === -1; });
}
