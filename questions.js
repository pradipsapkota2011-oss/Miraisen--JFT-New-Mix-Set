// questions.js
const questions = [

{
  id: 1,
  section: "Vocabulary",
  instruction: "Look at the illustration and choose the correct word.",
  image: "Q1.png",
  options: ["いわいます", "かざります", "かいます"],
  answer: 1,
  marks: 4
},
{
  id: 2,
  section: "Vocabulary",
  instruction: "Look at the illustration and choose the correct word.",
  image: "Q2.png",
  options: ["じしん", "つなみ", "たいふう"],
  answer: 0,
  marks: 4
},
{
  id: 3,
  section: "Vocabulary",
  instruction: "Look at the illustration and choose the correct word.",
  image: "Q3.png",
  options: ["きれい", "かわいい", "かわい"],
  answer: 1,
  marks: 4
},
{
  id: 4,
  section: "Vocabulary",
   instruction: "Look at the illustration and choose the correct word.",
  image: "Q4.png",
  options: ["さかな", "むし", "エビ"],
  answer: 2,
  marks: 4
},
{
  id: 5,
  section: "Grammar",
  instruction: "Read the sentence and choose the word that fits in ( ) the most.",
  question: "毎日_________を読みます 。",
  options: ["マンガ", "アニメ", "日本語"],
  answer: 0,
  marks: 4
},
{
  id: 6,
  section: "Grammar",
  instruction: "Read the sentence and choose the word that fits in ( ) the most.",
  question: "A : このきかいの使いかたを__________くれませんか？",
  options: ["すわって", "おしえて", "まわして"],
  answer: 1,
  marks: 4
},
{
  id: 7,
  section: "Grammar",
  instruction: "Read the sentence and choose the word that fits in ( ) the most.",
  question: "毎週、おそくまでしごとを_______、ご飯を食べます 。",
  options: ["持って", "して", "食べて"],
  answer: 1,
  marks: 4
},
{
  id: 8,
  section: "Grammar",
  instruction: "How do you write the underlined kanji word in hiragana?",
  subtitle: "Choose the correct one.",
  question: "<span style='text-decoration:underline;'>先週</span>、日本に来たばかりです。",
  options: ["せんしゅう", "こんしゅう", "らいしゅう"],
  answer: 0,
  marks: 4
},
{
  id: 9,
  section: "Grammar",
  instruction: "How do you write the underlined kanji word in hiragana?",
  subtitle: "Choose the correct one.",
  question: "やっと試験に<span style='text-decoration:underline;'>合格</span>しました。",
  options: ["こうかく", "ごうがく", "ごうかく"],
  answer: 2,
  marks: 4
},
{
  id: 10,
  section: "Grammar",
  instruction: "How do you write the underlined kanji word in hiragana?",
  subtitle: "Choose the correct one.",
  question: "この町は<span style='text-decoration:underline;'>自然</span>がきれいな町です。",
  options: ["じせん", "しせん", "しぜん"],
  answer: 2,
  marks: 4
},
{
  id: 11,
  section: "Grammar",
  instruction: "How do you write the underlined kanji word in hiragana?",
  subtitle: "Choose the correct one.",
  question: "先生に日本語を<span style='text-decoration:underline;'>習います</span>。",
  options: ["ならいます", "おしえます", "れんしゅうします"],
  answer: 0,
  marks: 4
},
{
  id: 12,
  section: "Grammar",
  instruction: "Read the sentence and choose the word that fits in ( ) the most.",
  question: "A : こうじょうでは、_________仕事をしていますか？<br>B : ぶひんをチェックしています。",
  options: ["どうして", "どこ", "どんな"],
  answer: 2,
  marks: 5
},
{
  id: 13,
  section: "Expression",
  instruction: "Read the dialog and choose the phrase that fits the most.",
  subtitle: "",
  type: "dialog",
  sideImage: "Q13.png",
  dialog: `
A :トイレはどこですか。<br>
B : 玄関の_____です。
`,
  options: [
    "あいだ",
    "うしろ",
    "よこ"
  ],
  answer: 2,
  marks: 5
},
{
  id: 14,
  section: "Expression",
  instruction: "Read the dialog and choose the phrase that fits the most.",
  subtitle: "",
  type: "dialog",
  dialog: `
A：日曜日に何をしましたか。<br>
B：仕事しました。とても………………。<br>
`,
  options: [
    "いそがしいです",
    "いそがしかったです",
    "ひまでした"
  ],
  answer: 1,
  marks: 5
},
{
  id: 15,
  section: "Expression",
  instruction: "Read the dialog and choose the phrase that fits the most.",
  subtitle: "",
  type: "dialog",
  dialog: `
A：すみません！この自転車を………………。<br>
　　本屋へ行きたいです。<br>
B：ええ、どうぞ。
`,
  options: [
    "買ってもいいですか",
    "借りてもいいですか",
    "貸してもいいですか"
  ],
  answer: 1,
  marks: 5
},
{
  id: 16,
  section: "Expression",
  instruction: "Read the dialog and choose the phrase that fits the most.",
  subtitle: "",
  type: "dialog",
  dialog: `
A : きれいですね。<br>
B : そうですね。ああ、水を______。<br>
A : びじゅつかんのなかでダメなんですよ。
`,
  options: [
    "飲んでください",
    "飲まないでください",
    "飲みますか"
  ],
  answer: 2,
  marks: 5
},
{
  id: 17,
  section: "Expression",
  instruction: "Read the dialog and choose the phrase that fits the most.",
  subtitle: "",
  type: "dialog",
  dialog: `
A：あのう、すみません。タイ料理のお店知っていますか。<br>
B：はい、光公園にありますよ。<br>
A：何時に………………わかりますか。<br>
B：10時ごろだと思います。<br>
A：ありがとうございます。
`,
  options: [
    "終わるか",
    "開くか",
    "出来るか"
  ],
  answer: 1,
  marks: 5
},
{
  id: 18,
  section: "Expression",
  instruction: "Read the dialog and choose the phrase that fits the most.",
  subtitle: "",
  type: "dialog",
  dialog: `
A : 会社を出てから、何をしますか。<br>
B : じぶんの会社をつくろうと思います。__________今、ちょうきんしています。
`,
  options: [
    "そのように",
    "そのとき",
    "そのために"
  ],
  answer: 2,
  marks: 5
},
{
  id: 19,
  section: "Expression",
  instruction: "Read the dialog and choose the phrase that fits the most.",
  subtitle: "",
  type: "dialog",
  dialog: `
A：その写真大学のときの写真ですか。<br>
B：はい、そうです。この青いワンピース着ているのは私の彼女なんですよ。<br>
A：このしゃしんはおもいでのひんですね。<br>
B：そうです。ずっと_____________
`,
  options: [
    "見ます",
    "大切にします",
    "かざります"
  ],
  answer: 1,
  marks: 5
},
{
  id: 20,
  section: "Expression",
  instruction: "Read the dialog and choose the phrase that fits the most.",
  subtitle: "",
  type: "dialog",
  dialog: `
A：そのジャケット _____ ですね！どこで買いましたか。<br>
B：みどり町のスーパーで買いました。<br>
A：高そうですね<br>
B：あまりたかくないですよ。
`,
  options: [
    "きれい",
    "好き",
    "かっこいい"
  ],
  answer: 2,
  marks: 5
},
{
  id: 21,
  section: "Expression",
  instruction: "Read the dialog and choose the phrase that fits the most.",
  subtitle: "",
  type: "dialog",
  dialog: `
A: __________テストに合格できました。<br> 
B: おめでとうございます。
`,
  options: [
    "そろそろ",
    "なかなか",
    "やっと"
  ],
  answer: 2,
  marks: 5
},
{
  id: 22,
  section: "Expression",
  instruction: "Read the dialog and choose the phrase that fits the most.",
  subtitle: "",
  type: "dialog",
  dialog: `
A：明日、しけんがある________どうして勉強していないの<br>
B：これからします。
`,
  options: [
    "から",
    "なら",
    "のに"
  ],
  answer: 2,
  marks: 5
},
{
  id: 23,
  section: "Expression",
  instruction: "Read the dialog and choose the phrase that fits the most.",
  subtitle: "",
  type: "dialog",
  dialog: `
A: 遅くなって、_______________ 。<br>
B: いいえ、大丈夫です。
`,
  options: [
    "べつにかまいません",
    "もうしわけありません",
    "しょうしょうおまちください"
  ],
  answer: 1,
  marks: 5
},
{
  id: 24,
  section: "Expression",
  instruction: "Read the dialog and choose the phrase that fits the most.",
  subtitle: "",
  type: "dialog",
  dialog: `
A : 来週からずっと雨そうですね。<br>
B : そうですね、せんたくにぜんぜんできませんね。<br>
A : __________。
`,
  options: [
    "いやになりますね",
    "まんぞくですね",
    "しあわせになりますね"
  ],
  answer: 0,
  marks: 5
},
{
  id: 25,
  section: "Listening",
  question: "  ごはんをつくるために、女の人は何時に起きますか。  ",
  audio: "Q1.mp3",
  options: [
    { image: "L11.png" },
    { image: "L12.png" },
    { image: "L13.png" }
  ],
  answer: 0,
  marks: 5
},
{
  id: 26,
  section: "Listening",
  question: "  さとうさん、は初めにに何をしますか。  ",
  audio: "Q2.mp3",
  options: [
    { image: "L21.png" },
    { image: "L22.png" },
    { image: "L23.png" }
  ],
  answer: 1,
  marks: 5
},
{
  id: 27,
  section: "Listening",
  question: "男の人の趣味は何ですか。",
  audio: "Q4.mp3",
  options: [
    { image: "L31.png" },
    { image: "L32.png" },
    { image: "L33.png" }
  ],
  answer: 2,
  marks: 5
},
{
  id: 28,
  section: "Listening",
  question: "ぼうしはいくらですか。",
  audio: "Q3.mp3",
  options: [
   "1500円",
    "1900円",
    "2000円"
  ],
  answer: 1,
  marks: 5
},
{
  id: 29,
  section: "Listening",
  question: " 動物園では、何で回りますか。 ？",
  audio: "Q5.mp3",
  options: [
    { image: "L51.png" },
    { image: "L52.png" },
    { image: "L53.png" }
  ],
  answer: 1,
  marks: 5
},
{
  id: 30,
  section: "Listening",
  question: "男の人は何を注文しましたか。?",
  audio: "Q6.mp3",
  options: [
    { image: "L61.png" },
    { image: "L62.png" },
    { image: "L63.png" }
  ],
  answer: 1,
  marks: 5
},
{
  type: "double",
  id: "31",
  section: "Listening",
  question: "Listen the audio and answer the following questions?",
  audio: "Q7.mp3",
  parts: [

    {
      title: "(a) 火事は何階ですか。？",
      options: [
                "2階",
                "3階",
                "4階"
      ],
      answer: 2,
      marks: 6
    },

    {
      title: "(b)   階段はどこにありますか。  ",
      options:[
       { image: "L71.png" },
       { image: "L72.png" },
       { image: "L73.png" }

      ],
      answer: 0,
      marks:5
    }

  ]
},
{
  type: "double",
  id: "32-33",
  section: "Listening",
  question: "次の会話を聞いて、質問に答えてください。",
  audio: "Q8.mp3",
  parts: [
    {
      title: "(a) 紙は何サイズですか。？",
      options: [
        "A3" ,
        "A4" ,
        "F4" 
      ],
      answer: 0,
      marks: 6
    },
    {
      title: "(b) ) 紙はどこにありますか。  ",
      options: [
        "いすの下",
        "机の上",
        "机の下"
      ],
      answer: 2,
      marks: 6
    }
  ]
},
{
  type: "double",
  id: "34-35",
  section: "Listening",
  question: "次の会話を聞いて、質問に答えてください。",
  audio: "Q9.mp3",
  parts: [
    {
      title: "(a) 宅配業者はどの階に荷物を配達しますか？",
      options: [
        { image: "L92a.png" },
        { image: "L91a.png" },
        { image: "L93a.png" }
             ],
      answer: 1,
      marks: 6
    },
    {
      title: "(b)何箱持って行きますか。",
      options: [
        { image: "L91.png" },
        { image: "L92.png" },
        { image: "L93.png" }
      ],
      answer: 0,
      marks: 6
    }
  ]
},
{
  type: "double",
  id: "36-37",
  section: "Reading",
  question: "Read the Passage and Answer the Following Questions",
  passage: `わたしは先週、家族といっしょに旅行に行きました。土曜日の夜、車で出かけました。山の道をとおるとき、空にきれいな星がたくさん見えました。町につくと、大きな花火も見ました。家族と楽しい時間をすごしました。`,
  parts: [
    {
      title: "(a) なんでりょこうに行きましたか。",
      options: [
        { image: "R11.png" },
        { image: "R12.png" },
        { image: "R13.png" }
      ],
      answer: 0,
      marks: 6
    },
    {
      title: "(b) 山の道をとおるときには何を見ましたか。",
      options: [
        { image: "R21.png" },
        { image: "R22.png" },
        { image: "R23.png" }
      ],
      answer: 1,
      marks: 6
    }
  ]
},
{
  type: "double",
  id: "38-39",
  section: "Reading",
  question: "Read the Passage and Answer the Following Questions",
  passage: `今日の朝、いえのにわにねこがいました。ねこがかわいいです。たくさん、写真をとりました`,
  parts: [
    {
      title: "(a) ねこはどこですか。",
      options: [
        { image: "R31.png" },
        { image: "R32.png" },
        { image: "R33.png" }
      ],
      answer: 1,
      marks: 7
    },
    {
      title: "(b) 今日、何をしましたか？",
      options: [
        "ねこの写真を撮りました。",
        "ねこを買いました",
        "ねこと遊びました"
      ],
      answer: 0,
      marks: 6
    }
  ]
},
{
  type: "double",
  id: "40-41",
  section: "Reading",
  question: "Read the Passage and Answer the Following Questions",
  passage: `今日は、町の人たちといっしょに海岸を掃除しました。海岸には、ガラスやプラスチックなどのごみがたくさんあって、あぶないからです。

朝九時から掃除を始めました。みんなでごみを拾って、分別しました。とてもつかれましたが、海岸がきれいになって、うれしかったです。

掃除がおわったあと、友だちといっしょに公園へ行きました。そこで、ゲームをして遊びました。とても楽しい一日でした。`,
  parts: [
    {
      title: "(a) どうして海岸を掃除しましたか。",
      options: [
        "あぶなくないから",
        "ゴミがないから",
        "ごみ合ってあぶないから"
      ],
      answer: 2,
      marks: 7
    },
    {
      title: "(b) 掃除がおわったあと、どこへ行きましたか。",
      options: [
        "海行きました",
        "うち帰りました",
        "公園でゲームした"
      ],
      answer: 2,
      marks: 7
    }
  ]
},
{
  type: "double",
  id: "42-43",
  section: "Reading",
  question: "Read the Passage and Answer the Following Questions",
  image: "RQ4.png",
  parts: [
    {
      title: "(a) 日曜日は何時に仕事終わりますか。",
      options: [
        "2時",
        "4時",
        "6時"
      ],
      answer: 0,
      marks: 7
    },
    {
      title: "(b) 休みはいつまでですか。",
      options: [
        "5月2日",
        "5月3日",
        "5月5日"
      ],
      answer: 2,
      marks: 6
    }
  ]
},
{
  type: "double",
  id: "44-45",
  section: "Reading",
  question: "Read the Passage and Answer the Following Questions",
  image: "RQ5.png",
  parts: [
    {
      title: "(a) 一日中　休みは　いつですか？",
      options: [
        "水ようび",
        "日、祝",
        "半日 休みしかない"
      ],
      answer: 2,
      marks: 6
    },
    {
      title: "(b) 今日は水曜日です。店は何時からですか。",
      options: [
        "9:00",
        "15:00",
        "18:00"
      ],
      answer: 1,
      marks: 6
    }
  ]
},
{
  type: "double",
  id: "46-47",
  section: "Reading",
  question: "Read the Passage and Answer the Following Questions",
  image: "RQ6.png",
  parts: [
    {
      title: "(a) 家にビールのかんがたくさんあります。いつすてればいいですか？",
      options: [
        "月曜日",
        "水曜日",
        "金曜日"
      ],
      answer: 2,
      marks: 6
    },
    {
      title: "(b) ゴミの捨て方について正しいのはどれですか。",
      options: [
        "朝、8時前に捨てなければならない",
        "夜、出すことができません",
        "ゴミはバラバラにして捨てても良い"
      ],
      answer: 0,
      marks: 6
    }
  ]
}
]
