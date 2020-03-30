'use strict';
const userNameInput = document.getElementById('user-name')
const assessmentButton =  document.getElementById('assessment');
const resultDivided = document.getElementById('result-area');
const tweetDivided = document.getElementById('tweet-area');


 /**
  * 指定した要素の子供をすべて消去する
  * @param {HTMLElement} element HTMLの要素
  */
 function removeAllChildren(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}  


assessmentButton.onclick = () => {
  const userName = userNameInput.value;
  if (userName.length === 0) {
    return;
  }
  

  //診断結果表示エリアの作成
  removeAllChildren(resultDivided);
  const header = document.createElement ('h3');
  header.innerText = '診断結果';
  resultDivided.appendChild(header);
  

  const paragraph = document.createElement('p');
  const result = assessment(userName);
  paragraph.innerText = result;
  resultDivided.appendChild(paragraph);
  

  //ツイートの表示エリアの作成
  removeAllChildren(tweetDivided);
  const anchor = document.createElement('a');
  const hrefValue = "https://twitter.com/intent/tweet?button_hashtag=あなただけのルーティーン&ref_src=twsrc%5Etfw";
  
  anchor.setAttribute('href', hrefValue);
  anchor.className = 'twitter-hashtag-button';
  anchor.setAttribute('data-text', result);
  anchor.innerText = 'Tweet #あなただけのルーティーン';
  
  tweetDivided.appendChild(anchor);

  // widgets.jsの設定
  const script = document.createElement('script');
  script.setAttribute('src', 'https://platform.twitter.com/widgets.js');
  tweetDivided.appendChild(script);
};


//エンターキーを押して診断結果を出す
userNameInput.onkeydown = (event) => {
  if (event.key === 'Enter') {
    assessmentButton.onclick();
  }
};


const answers = [
'{userName}のルーティーンは[仏の魔術師(ゾルマジシャン)]です。{userName}はグラタンを頭からかぶります。',
'{userName}のルーティーンは[技巧の味捌(テクノロジーテイスター)]です。{userName}はスマートフォンを舐めます。',
'{userName}のルーティーンは[壺中の王(インセクトエンペラー)]です。{userName}はカブトムシと添い寝します。',
'{userName}のルーティーンは[傲慢な侵入欲(ジャストインベイダー)]です。{userName}は隣人の合鍵を作ります。',
'{userName}のルーティーンは[精一杯の反逆(リバースジャッジメント)]です。{userName}はお釣りを投げ返します',
'{userName}のルーティーンは[青天の独占(ストームディフェンダー)]です。{userName}は傘を買い占めます。',
'{userName}のルーティーンは[緑黄の友好(オールフレンドリー)]です。{userName}はカエルを親友だと言い張ります。',
'{userName}のルーティーンは[極限の自己中(ホラーアイデンティティ)]です。{userName}はパーティーなどで主役より目立とうとします。',
'{userName}のルーティーンは[化学の達成値(ケミカルアルティメット)]です。{userName}はカラスを脱色します。',
'{userName}のルーティーンは[極小の心器(フェアーインバイト)]です。{userName}は遊びの誘われ方の違いに激高します。',
'{userName}のルーティーンは[異端の誘惑(ファニートラベラー)]です。{userName}はことあるごとに渡米します。',
'{userName}のルーティーンは[強制の空気工(エアーコンディショナー)]です。{userName}は窓を割りながら徘徊します。',
'{userName}のルーティーンは[競争の過信(ナンバーワンスプリンター)]です。{userName}はカールルイスと張り合います。',
'{userName}のルーティーンは[海中の名残(リトルマーメイド)]です。{userName}は恋人のエラを鷲掴みます。',
]

/**
 * 名前の文字列を渡すと診断結果を返す関数
 * @param {string} userName
 * @return {string} 診断結果 
 */
function assessment (userName) {
    //全文字のコード番号を所得してそれを足し合わせる
    let  sumOfCharCode = 0;
    for (let i = 0; i < userName.length; i++) {
        sumOfCharCode= sumOfCharCode + userName.charCodeAt(i);
    }

    //文字のコード番号の合計を回答の数で割って添字の数値を求める
    const index =  sumOfCharCode % answers.length;
    let result = answers[index];
    result = result.replace(/\{userName\}/g, userName);
    return  result;
}

//テストコード
console.assert(
    assessment('太郎') === '太郎のいいところは決断力です。太郎がする決断にいつも助けられる人がいます。',
    '診断結果の文言の特定の部分を名前に置き換える処理が正しくありません。'
  );

  console.assert(
    assessment('太郎') === assessment('太郎'),
    '入力が同じ名前なら同じ診断結果を出力する処理が正しくありません。'
  );
