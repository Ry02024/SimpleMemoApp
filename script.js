document.addEventListener('DOMContentLoaded', loadMemos);
document.getElementById('saveButton').addEventListener('click', saveMemo);

async function saveMemo() {
    var memoText = document.getElementById('memoInput').value;
    var password = document.getElementById('keyInput').value; // ユーザーから暗号化キーを取得
    if (memoText && password) {
        var encryptedMemo = await encryptText(memoText, password);
        var timestamp = new Date().getTime(); // タイムスタンプを生成
        var memoObject = { encryptedMemo, timestamp }; // オブジェクトとして保存
        
        var memos = JSON.parse(localStorage.getItem('memos')) || [];
        memos.push(memoObject);
        localStorage.setItem('memos', JSON.stringify(memos));
        
        addMemoToDOM(memoText, timestamp); // タイムスタンプも渡す
        document.getElementById('memoInput').value = ''; // 入力フィールドをクリア
    } else {
        alert("メモと暗号化キーを両方入力してください。");
    }
}

async function loadMemos() {
    var memos = JSON.parse(localStorage.getItem('memos')) || [];
    var password = prompt("メモを読み込むための暗号化キーを入力してください。");
    if (password) {
        try {
            for (let {encryptedMemo, timestamp} of memos) {
                var memoText = await decryptText(encryptedMemo, password);
                addMemoToDOM(memoText, timestamp);
            }
        } catch (e) {
            alert("暗号化キーが正しくありません。");
        }
    }
}

function addMemoToDOM(memoText, timestamp) {
    var memo = document.createElement('div');
    memo.textContent = memoText;
    memo.setAttribute('data-timestamp', timestamp); // タイムスタンプを属性として追加

    var deleteButton = document.createElement('button');
    deleteButton.textContent = '削除';
    deleteButton.onclick = function() {
        memo.remove();
        removeMemoFromStorage(timestamp);
    };
    memo.appendChild(deleteButton);
    document.getElementById('memoContainer').appendChild(memo);
}

function removeMemoFromStorage(timestamp) {
    var memos = JSON.parse(localStorage.getItem('memos')) || [];
    var updatedMemos = memos.filter(memoObject => memoObject.timestamp !== timestamp);
    localStorage.setItem('memos', JSON.stringify(updatedMemos));
}

// これはあくまでデモンストレーションです
async function encryptText(plainText, password) {
    try {
        // 実際の暗号化プロセスをここに実装
        return btoa(plainText); // Base64で簡易エンコード
    } catch (e) {
        console.error("Encryption failed", e);
    }
}

async function decryptText(encryptedText, password) {
    try {
        // 実際の復号化プロセスをここに実装
        return atob(encryptedText); // Base64で簡易デコード
    } catch (e) {
        console.error("Decryption failed", e);
    }
}
