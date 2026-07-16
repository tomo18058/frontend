const jsButton = document.getElementById('jsButton');
const jsTitle = document.getElementById('jsTitle');
const jsMessage = document.getElementById('jsMessage');
const countButton = document.getElementById('countButton');
const countResult = document.getElementById('countResult');
const textInput = document.getElementById('textInput');
const textResult = document.getElementById('textResult');

let count = 0;

if (jsButton && jsTitle && jsMessage) {
    jsButton.addEventListener('click', () => {
        alert('色が変わったよ！');

        const colors = ['#2563eb', '#dc2626', '#16a34a', '#7c3aed'];
        const messages = [
            'JavaScriptで色が変わりました！',
            'ボタンを押すたびに動きます！',
            'イベント処理の練習中です。',
            'JavaScriptだけでページを動かせます。'
        ];

        const nextColor = colors[Math.floor(Math.random() * colors.length)];
        const nextMessage = messages[Math.floor(Math.random() * messages.length)];

        jsTitle.style.color = nextColor;
        jsMessage.textContent = nextMessage;
    });
}

if (countButton && countResult) {
    countButton.addEventListener('click', () => {
        count += 1;
        countResult.textContent = `カウント: ${count}`;
    });
}

if (textInput && textResult) {
    textInput.addEventListener('input', () => {
        textResult.textContent = `入力中: ${textInput.value}`;
    });
}
