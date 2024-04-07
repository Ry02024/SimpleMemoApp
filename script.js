// script.js
document.addEventListener('DOMContentLoaded', loadMemos);
document.getElementById('saveButton').addEventListener('click', saveMemo);

function saveMemo() {
    var memoText = document.getElementById('memoInput').value;
    if (memoText) {
        var memos = JSON.parse(localStorage.getItem('memos')) || [];
        memos.push(memoText);
        localStorage.setItem('memos', JSON.stringify(memos));
        addMemoToDOM(memoText);
        document.getElementById('memoInput').value = ''; // 入力フィールドをクリア
    }
}

function loadMemos() {
    var memos = JSON.parse(localStorage.getItem('memos')) || [];
    memos.forEach(addMemoToDOM);
}

function addMemoToDOM(memoText) {
    var memo = document.createElement('div');
    memo.textContent = memoText;

    // 削除ボタンの追加
    var deleteButton = document.createElement('button');
    deleteButton.textContent = '削除';
    deleteButton.onclick = function() {
        memo.remove(); // DOMからメモを削除
        removeMemoFromStorage(memoText);
    };
    memo.appendChild(deleteButton);

    document.getElementById('memoContainer').appendChild(memo);
}

function removeMemoFromStorage(memoText) {
    var memos = JSON.parse(localStorage.getItem('memos')) || [];
    var updatedMemos = memos.filter(function(memo) {
        return memo !== memoText;
    });
    localStorage.setItem('memos', JSON.stringify(updatedMemos));
}
