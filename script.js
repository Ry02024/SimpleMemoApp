// script.js
document.getElementById('saveButton').addEventListener('click', function() {
    var memoText = document.getElementById('memoInput').value;
    if (memoText) {
        var memo = document.createElement('div');
        memo.textContent = memoText;
        document.getElementById('memoContainer').appendChild(memo);
        document.getElementById('memoInput').value = ''; // 入力フィールドをクリア
    }
});
