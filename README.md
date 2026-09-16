
<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Marges</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,600;9..144,700&family=Newsreader:ital,wght@0,400;0,500;1,400&family=IBM+Plex+Mono:wght@400;500&display=swap" rel="stylesheet">
<style>
  :root{
    --bg: #101c18;
    --paper: #f1e8d0;
    --paper-shadow: #d8cca8;
    --ink: #241f18;
    --ink-soft: #4a4032;
    --gold: #c89b4a;
    --rust: #a8542f;
    --teal: #4a7a73;
    --rule: rgba(36,31,24,0.18);
  }
  *{box-sizing:border-box;}
  html,body{margin:0;padding:0;}
  body{
    background: var(--bg);
    font-family:'Newsreader', serif;
    color: var(--ink);
    overflow:hidden;
  }
  #feed{
    height:100vh;
    overflow-y:scroll;
    scroll-snap-type:y mandatory;
    scrollbar-width:none;
  }
  #feed::-webkit-scrollbar{display:none;}
  section.card-slot{
    height:100vh;
    width:100%;
    display:flex;
    align-items:center;
    justify-content:center;
    scroll-snap-align:start;
    scroll-snap-stop:always;
    position:relative;
    padding:28px 20px;
  }

  .flip-container{
    width:100%;
    max-width:460px;
    height:100%;
    max-height:760px;
    position:relative;
    perspective:1700px;
    opacity:0.35;
    transform: scale(0.94);
    transition: opacity 0.5s ease, transform 0.5s ease;
  }
  .card-slot.in-view .flip-container{
    opacity:1;
    transform: scale(1);
  }
  .card-inner{
    position:relative;
    width:100%;
    height:100%;
    transform-style:preserve-3d;
    transition: transform 0.65s cubic-bezier(.4,.15,.2,1);
  }
  .card-inner.flipped{ transform: rotateY(180deg); }

  .card{
    position:absolute;
    inset:0;
    background: var(--paper);
    border-radius:6px;
    box-shadow: 0 30px 60px -20px rgba(0,0,0,0.55), 0 0 0 1px rgba(0,0,0,0.05);
    padding:34px 30px 26px;
    display:flex;
    flex-direction:column;
    backface-visibility:hidden;
  }
  .card.back{ transform: rotateY(180deg); }
  .card::before{
    content:'';
    position:absolute;
    top:26px; left:26px;
    width:11px; height:11px;
    border-radius:50%;
    background: var(--bg);
    box-shadow: inset 0 2px 3px rgba(0,0,0,0.5);
  }
  .card-index{
    position:absolute;
    top:22px; right:26px;
    font-family:'IBM Plex Mono', monospace;
    font-size:11px;
    letter-spacing:0.04em;
    color: var(--ink-soft);
  }
  .card-tag{
    align-self:flex-start;
    margin-left:26px;
    margin-top:2px;
    font-family:'IBM Plex Mono', monospace;
    font-size:11px;
    padding:3px 9px;
    border-radius:100px;
    border:1px solid var(--teal);
    color: var(--teal);
  }
  .card-tag.gold{ border-color:var(--gold); color:#9c7226; }
  .card-tag.back-tag{ border-color: var(--rust); color: var(--rust); }
  .card-body{
    margin-top:18px;
    padding-top:14px;
    border-top:1px solid var(--rule);
    flex:1;
    display:flex;
    flex-direction:column;
    overflow:hidden;
  }
  h1.title{
    font-family:'Fraunces', serif;
    font-weight:600;
    font-size: clamp(26px,7vw,32px);
    line-height:1.08;
    margin:0 0 4px;
  }
  .subtitle{
    font-family:'IBM Plex Mono', monospace;
    font-size:12px;
    color: var(--ink-soft);
    margin:0 0 14px;
  }
  p.lead{
    font-size:17px;
    line-height:1.55;
    margin:0 0 12px;
  }
  p.lead:last-child{ margin-bottom:0; }
  .example{
    margin-top:auto;
    padding-top:12px;
    border-top: 1px dashed var(--rule);
    font-size:14px;
    color: var(--ink-soft);
    font-style:italic;
    line-height:1.5;
  }
  .diagram-wrap{
    flex:1;
    display:flex;
    align-items:center;
    justify-content:center;
    min-height:0;
  }
  .diagram-wrap svg{ width:100%; height:auto; max-height:100%; }
  .diagram-caption{
    font-size:13.5px;
    color: var(--ink-soft);
    text-align:center;
    margin-top:8px;
    line-height:1.4;
  }
  .book-author{
    font-family:'IBM Plex Mono', monospace;
    font-size:12px;
    color: var(--ink-soft);
    margin:0 0 14px;
  }
  ul.takeaways{ margin:0 0 14px; padding-left:18px; }
  ul.takeaways li{ font-size:15px; line-height:1.45; margin-bottom:7px; }
  .sources{ margin-top:auto; padding-top:12px; border-top:1px solid var(--rule); }
  .sources-label{
    font-family:'IBM Plex Mono', monospace;
    font-size:10.5px;
    color: var(--gold);
    margin-bottom:6px;
  }
  .sources ol{ margin:0; padding-left:16px; }
  .sources li{
    font-family:'IBM Plex Mono', monospace;
    font-size:11px;
    color: var(--ink-soft);
    line-height:1.5;
    margin-bottom:3px;
  }

  /* back-face content */
  .back-note{
    font-size:16px;
    line-height:1.58;
    color: var(--ink);
    margin-top:auto;
    margin-bottom:auto;
  }
  details.quiz summary{
    cursor:pointer;
    font-family:'IBM Plex Mono', monospace;
    font-size:11.5px;
    color: var(--rust);
    margin-top:14px;
    list-style:none;
  }
  details.quiz summary::-webkit-details-marker{ display:none; }
  details.quiz summary::before{ content:'→ '; }
  details.quiz[open] summary::before{ content:'↓ '; }
  details.quiz p{
    font-size:14.5px;
    line-height:1.5;
    color: var(--ink-soft);
    margin:8px 0 0;
    padding-top:8px;
    border-top:1px dashed var(--rule);
  }

  /* like + flip overlay controls */
  .card-controls{
    position:absolute;
    bottom:14px; left:0; right:0;
    display:flex;
    justify-content:space-between;
    padding:0 16px;
    z-index:6;
    pointer-events:none;
  }
  .ctrl-btn{
    pointer-events:auto;
    width:40px; height:40px;
    border-radius:50%;
    border:1px solid rgba(241,232,208,0.5);
    background: rgba(16,28,24,0.55);
    backdrop-filter: blur(3px);
    display:flex;
    align-items:center;
    justify-content:center;
    cursor:pointer;
    transition: transform 0.15s ease, background 0.2s ease;
  }
  .ctrl-btn:active{ transform: scale(0.88); }
  .ctrl-btn svg{ width:19px; height:19px; }
  .like-btn svg path{ fill:none; stroke:#f1e8d0; stroke-width:1.7; transition: fill .2s, stroke .2s; }
  .like-btn.liked svg path{ fill: var(--rust); stroke: var(--rust); }
  .flip-btn svg path{ fill:none; stroke:#f1e8d0; stroke-width:1.6; }

  #fav-counter{
    position:fixed;
    top:16px; left:16px;
    font-family:'IBM Plex Mono', monospace;
    font-size:12px;
    color: var(--paper);
    background: rgba(241,232,208,0.08);
    border:1px solid rgba(241,232,208,0.2);
    padding:5px 11px;
    border-radius:100px;
    z-index:10;
    display:flex;
    align-items:center;
    gap:6px;
  }
  #fav-counter svg{ width:11px; height:11px; }
  #fav-counter svg path{ fill: var(--rust); stroke:var(--rust); }

  #nav{
    position:fixed;
    right:14px; top:50%;
    transform:translateY(-50%);
    display:flex;
    flex-direction:column;
    gap:9px;
    z-index:10;
  }
  #nav button{
    width:6px; height:6px;
    border-radius:50%;
    border:none;
    background: rgba(241,232,208,0.25);
    padding:0;
    cursor:pointer;
    transition: background 0.3s, transform 0.3s;
  }
  #nav button.active{ background: var(--gold); transform: scale(1.6); }
  @media (max-width:480px){ #nav{ right:8px; } }

  .hint{
    position:fixed;
    bottom:16px; left:0; right:0;
    text-align:center;
    font-family:'IBM Plex Mono', monospace;
    font-size:10.5px;
    color: rgba(241,232,208,0.4);
    letter-spacing:0.03em;
    pointer-events:none;
    z-index:5;
    transition: opacity 0.6s;
  }

  /* top-right: messaging entry */
  #msg-btn{
    position:fixed;
    top:16px; right:16px;
    z-index:10;
    display:flex;
    align-items:center;
    gap:6px;
    font-family:'IBM Plex Mono', monospace;
    font-size:12px;
    color: var(--paper);
    background: rgba(241,232,208,0.08);
    border:1px solid rgba(241,232,208,0.2);
    padding:5px 12px;
    border-radius:100px;
    cursor:pointer;
  }
  #msg-btn svg{ width:14px; height:14px; }
  #msg-btn svg path{ fill:none; stroke:var(--paper); stroke-width:1.6; }
  #msg-btn .dot{
    width:6px;height:6px;border-radius:50%;
    background:var(--rust); display:none;
  }
  #msg-btn.has-unread .dot{ display:inline-block; }

  /* bottom-left: compose */
  #compose-btn{
    position:fixed;
    bottom:20px; left:16px;
    z-index:10;
    width:52px; height:52px;
    border-radius:50%;
    background: var(--gold);
    color: var(--bg);
    border:none;
    font-size:26px;
    line-height:1;
    display:flex;
    align-items:center;
    justify-content:center;
    cursor:pointer;
    box-shadow:0 8px 20px rgba(0,0,0,0.4);
  }
  #compose-btn:active{ transform: scale(0.92); }

  /* overlays */
  .overlay{
    position:fixed; inset:0;
    background: rgba(10,17,15,0.86);
    display:none;
    align-items:center;
    justify-content:center;
    z-index:50;
    padding:24px;
  }
  .overlay.open{ display:flex; }
  .modal-panel{
    background: var(--paper);
    border-radius:8px;
    width:100%;
    max-width:420px;
    max-height:86vh;
    display:flex;
    flex-direction:column;
    overflow:hidden;
    box-shadow:0 30px 60px rgba(0,0,0,0.5);
  }
  .modal-head{
    display:flex;
    align-items:center;
    justify-content:space-between;
    padding:16px 18px 12px;
    border-bottom:1px solid var(--rule);
  }
  .modal-head h2{
    font-family:'Fraunces', serif;
    font-size:19px;
    margin:0;
    font-weight:600;
  }
  .modal-close{
    background:none; border:none; cursor:pointer;
    font-family:'IBM Plex Mono', monospace;
    font-size:13px; color: var(--ink-soft);
  }
  .modal-body{ padding:16px 18px 18px; overflow-y:auto; }
  .field-label{
    font-family:'IBM Plex Mono', monospace;
    font-size:10.5px;
    color: var(--ink-soft);
    margin-bottom:6px;
    display:block;
  }
  .mode-toggle{
    display:flex;
    gap:0;
    margin-bottom:16px;
    border:1px solid var(--ink);
    border-radius:100px;
    overflow:hidden;
  }
  .mode-btn{
    flex:1;
    padding:8px 0;
    border:none;
    background:transparent;
    font-family:'IBM Plex Mono', monospace;
    font-size:12px;
    color: var(--ink);
    cursor:pointer;
  }
  .mode-btn.active{
    background: var(--ink);
    color: var(--paper);
  }
  .text-toolbar{
    display:flex;
    gap:6px;
    margin-bottom:8px;
    flex-wrap:wrap;
  }
  .tb-btn{
    font-family:'IBM Plex Mono', monospace;
    font-size:11px;
    padding:6px 10px;
    border:1px solid var(--rule);
    border-radius:4px;
    background:#ffffff40;
    color:var(--ink);
    cursor:pointer;
  }
  .tb-btn:active{ background: var(--ink); color: var(--paper); }
  #compose-text{ white-space:pre-wrap; }
  .lead mark, .post-legend mark{
    background: var(--gold);
    color: var(--ink);
    padding:0 3px;
    border-radius:2px;
  }
  .lead{ white-space:pre-wrap; }
  .file-btn{
    display:inline-block;
    font-family:'IBM Plex Mono', monospace;
    font-size:12px;
    padding:9px 14px;
    border:1px solid var(--ink);
    border-radius:4px;
    cursor:pointer;
    background:transparent;
    color:var(--ink);
    margin-bottom:12px;
  }
  .compose-preview{
    width:100%;
    max-height:180px;
    object-fit:cover;
    border-radius:4px;
    margin-bottom:12px;
    display:none;
    background:#00000010;
  }
  #compose-caption{
    width:100%;
    font-family:'Newsreader', serif;
    font-size:15px;
    padding:10px;
    border:1px solid var(--rule);
    border-radius:4px;
    resize:vertical;
    min-height:70px;
    margin-bottom:14px;
    background:#ffffff40;
    color:var(--ink);
  }
  .modal-actions{ display:flex; gap:10px; justify-content:flex-end; }
  .btn{
    font-family:'IBM Plex Mono', monospace;
    font-size:12px;
    padding:9px 16px;
    border-radius:4px;
    cursor:pointer;
    border:1px solid var(--ink);
    background:transparent;
    color:var(--ink);
  }
  .btn.primary{ background: var(--ink); color: var(--paper); }
  .btn.primary:disabled{ opacity:0.4; cursor:default; }

  .profile-chip{
    font-family:'IBM Plex Mono', monospace;
    font-size:11px;
    color: var(--ink-soft);
    display:flex;
    align-items:center;
    gap:8px;
  }
  .profile-chip button{
    background:none;border:none;color:var(--rust);
    font-family:'IBM Plex Mono', monospace;
    font-size:11px; cursor:pointer; text-decoration:underline;
    padding:0;
  }

  /* messaging thread UI */
  #contact-list{ list-style:none; margin:0 0 14px; padding:0; }
  #contact-list li{
    padding:10px 8px;
    border-bottom:1px solid var(--rule);
    cursor:pointer;
    font-size:14.5px;
    display:flex; justify-content:space-between; align-items:center;
  }
  #contact-list li:hover{ background:#00000008; }
  #add-contact{
    width:100%;
    font-family:'Newsreader', serif;
    font-size:14px;
    padding:9px 10px;
    border:1px solid var(--rule);
    border-radius:4px;
    margin-bottom:6px;
    background:#ffffff40;
    color:var(--ink);
  }
  #thread-view{ display:none; flex-direction:column; }
  #thread-view.active{ display:flex; }
  #thread-back{
    background:none;border:none;cursor:pointer;
    font-family:'IBM Plex Mono', monospace;
    font-size:11px; color:var(--ink-soft); margin-bottom:10px; text-align:left; padding:0;
  }
  #thread-messages{
    display:flex; flex-direction:column; gap:8px;
    max-height:280px; overflow-y:auto; margin-bottom:12px; padding-right:4px;
  }
  .msg-bubble{
    max-width:78%;
    padding:8px 12px;
    border-radius:12px;
    font-size:14px;
    line-height:1.4;
  }
  .msg-bubble.mine{
    align-self:flex-end;
    background: var(--ink);
    color: var(--paper);
    border-bottom-right-radius:3px;
  }
  .msg-bubble.theirs{
    align-self:flex-start;
    background: rgba(74,122,115,0.18);
    color: var(--ink);
    border-bottom-left-radius:3px;
  }
  .msg-meta{
    font-family:'IBM Plex Mono', monospace;
    font-size:9.5px;
    color: var(--ink-soft);
    margin-top:2px;
  }
  #thread-input-row{ display:flex; gap:8px; }
  #thread-input{
    flex:1;
    font-family:'Newsreader', serif;
    font-size:14px;
    padding:9px 10px;
    border:1px solid var(--rule);
    border-radius:4px;
    background:#ffffff40;
    color:var(--ink);
  }
  .empty-note{
    font-size:13.5px; color:var(--ink-soft); font-style:italic;
  }

  /* user-posted cards: plain full-bleed photo, no paper frame */
  .card.photo{
    background: #000;
    padding:0;
  }
  .card.photo::before{ display:none; }
  .card.photo .card-body{
    margin:0; padding:0; border:0;
    height:100%; overflow:hidden;
  }
  .post-photo{
    width:100%;
    height:100%;
    object-fit:cover;
    display:block;
  }
  .delete-btn{
    position:absolute;
    top:14px; right:14px;
    z-index:6;
    width:34px; height:34px;
    border-radius:50%;
    border:1px solid rgba(241,232,208,0.5);
    background: rgba(16,28,24,0.55);
    backdrop-filter: blur(3px);
    display:flex;
    align-items:center;
    justify-content:center;
    cursor:pointer;
  }
  .delete-btn svg{ width:14px; height:14px; }
  .delete-btn svg path{ fill:none; stroke:#f1e8d0; stroke-width:1.7; }
</style>
</head>
<body>

<div id="fav-counter">
  <svg viewBox="0 0 20 18"><path d="M10 17 C2 11 1 5 5.5 2.5 C8 1 10 2.5 10 5 C10 2.5 12 1 14.5 2.5 C19 5 18 11 10 17 Z"/></svg>
  <span id="fav-count">0</span>
</div>

<div id="msg-btn">
  <svg viewBox="0 0 22 18"><path d="M1 2h20v14H1z M1 2l10 9 10-9"/></svg>
  <span>Messages</span>
  <span class="dot"></span>
</div>

<button id="compose-btn" aria-label="Publier une fiche">+</button>

<div id="feed">

  <section class="card-slot">
    <div class="flip-container"><div class="card-inner"><div class="card">
      <div class="card-index">N° 00</div>
      <h1 class="title" style="font-size:44px; margin-top:8px;">Marges</h1>
      <p class="subtitle" style="margin-bottom:20px;">notes de lecture, à défiler</p>
      <p class="lead">Le même geste que sur les réseaux — mais chaque écran est une idée, un schéma ou un livre résumé, sources à l'appui.</p>
      <p class="lead" style="font-size:14px; color:var(--ink-soft);">Touchez le cœur pour garder une fiche. Touchez ⟲ pour la retourner et creuser un peu plus. Touchez + pour publier votre propre fiche.</p>
      <p class="example">Faites glisser vers le haut pour commencer.</p>
    </div></div></div>
  </section>

  <div id="user-posts-anchor"></div>

  <!-- 01 CONCEPT: biais de confirmation -->
  <section class="card-slot">
    <div class="flip-container">
      <div class="card-inner" id="inner-01">
        <div class="card front">
          <div class="card-index">N° 01</div>
          <div class="card-tag">Concept</div>
          <div class="card-body">
            <h1 class="title">Le biais de confirmation</h1>
            <p class="lead">Notre esprit va naturellement vers les informations qui confirment ce qu'on pense déjà, et laisse filer celles qui le contredisent.</p>
            <p class="lead">Ce n'est pas de la mauvaise foi : c'est un raccourci mental, plus rapide que d'examiner chaque fait à froid.</p>
            <p class="example">Deux personnes lisent le même article économique et en ressortent chacune persuadées d'avoir eu raison depuis le début.</p>
          </div>
        </div>
        <div class="card back">
          <div class="card-index">N° 01</div>
          <div class="card-tag back-tag">Pour aller plus loin</div>
          <div class="card-body">
            <details class="quiz" open>
              <summary>Vrai ou faux : être très sûr de soi rend une réponse plus fiable</summary>
              <p>Faux. Le niveau de confiance qu'on ressent n'est presque pas corrélé à l'exactitude — c'est même l'un des biais les plus étudiés en psychologie du jugement.</p>
            </details>
            <p class="back-note">Une façon de s'en prémunir : chercher activement l'argument qui prouverait qu'on a tort, avant de chercher celui qui confirme.</p>
          </div>
        </div>
      </div>
      <div class="card-controls">
        <button class="ctrl-btn like-btn" data-id="01" aria-label="Garder cette fiche"><svg viewBox="0 0 20 18"><path d="M10 17 C2 11 1 5 5.5 2.5 C8 1 10 2.5 10 5 C10 2.5 12 1 14.5 2.5 C19 5 18 11 10 17 Z"/></svg></button>
        <button class="ctrl-btn flip-btn" data-target="inner-01" aria-label="Retourner la fiche"><svg viewBox="0 0 20 20"><path d="M17 10a7 7 0 1 1-2-4.9M17 3v4h-4"/></svg></button>
      </div>
    </div>
  </section>

  <!-- 02 DIAGRAM: photosynthese -->
  <section class="card-slot">
    <div class="flip-container">
      <div class="card-inner" id="inner-02">
        <div class="card front">
          <div class="card-index">N° 02</div>
          <div class="card-tag gold">Schéma</div>
          <div class="card-body" style="overflow:visible;">
            <h1 class="title" style="font-size:24px;">La photosynthèse</h1>
            <div class="diagram-wrap">
              <svg viewBox="0 0 360 300" fill="none">
                <circle cx="60" cy="50" r="26" stroke="#c89b4a" stroke-width="2.5"/>
                <g stroke="#c89b4a" stroke-width="2.5">
                  <line x1="60" y1="10" x2="60" y2="0"/>
                  <line x1="60" y1="100" x2="60" y2="90"/>
                  <line x1="20" y1="50" x2="10" y2="50"/>
                  <line x1="30" y1="20" x2="23" y2="13"/>
                  <line x1="90" y1="20" x2="97" y2="13"/>
                </g>
                <path d="M180 190 C130 190 110 150 140 110 C160 130 200 130 200 90 C230 130 240 170 200 200 C215 220 200 245 180 245 C160 245 145 220 160 200 Z" fill="#e7dcb9" stroke="#241f18" stroke-width="2"/>
                <line x1="180" y1="245" x2="180" y2="270" stroke="#241f18" stroke-width="3"/>
                <path d="M90 60 L150 130" stroke="#c89b4a" stroke-width="2" marker-end="url(#arrow)"/>
                <g font-family="IBM Plex Mono" font-size="11" fill="#4a4032">
                  <text x="215" y="70">CO₂</text>
                  <line x1="255" y1="66" x2="220" y2="130" stroke="#4a7a73" stroke-width="1.6" marker-end="url(#arrowt)"/>
                  <text x="20" y="220">H₂O</text>
                  <line x1="45" y1="215" x2="140" y2="215" stroke="#4a7a73" stroke-width="1.6" marker-end="url(#arrowt)"/>
                  <text x="270" y="150">O₂</text>
                  <line x1="230" y1="140" x2="265" y2="148" stroke="#4a7a73" stroke-width="1.6"/>
                  <text x="270" y="200">glucose</text>
                  <line x1="220" y1="190" x2="265" y2="198" stroke="#4a7a73" stroke-width="1.6"/>
                </g>
                <defs>
                  <marker id="arrow" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="#c89b4a"/></marker>
                  <marker id="arrowt" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="#4a7a73"/></marker>
                </defs>
              </svg>
            </div>
            <p class="diagram-caption">La feuille capte la lumière et transforme eau + CO₂ en glucose, en rejetant de l'oxygène.</p>
          </div>
        </div>
        <div class="card back">
          <div class="card-index">N° 02</div>
          <div class="card-tag back-tag">Le saviez-vous</div>
          <div class="card-body">
            <p class="back-note">Une bonne partie de l'oxygène que vous respirez ne vient pas des forêts mais du phytoplancton océanique — des algues microscopiques qui font la même photosynthèse, à l'échelle des mers entières.</p>
          </div>
        </div>
      </div>
      <div class="card-controls">
        <button class="ctrl-btn like-btn" data-id="02" aria-label="Garder cette fiche"><svg viewBox="0 0 20 18"><path d="M10 17 C2 11 1 5 5.5 2.5 C8 1 10 2.5 10 5 C10 2.5 12 1 14.5 2.5 C19 5 18 11 10 17 Z"/></svg></button>
        <button class="ctrl-btn flip-btn" data-target="inner-02" aria-label="Retourner la fiche"><svg viewBox="0 0 20 20"><path d="M17 10a7 7 0 1 1-2-4.9M17 3v4h-4"/></svg></button>
      </div>
    </div>
  </section>

  <!-- 03 BOOK: Sapiens -->
  <section class="card-slot">
    <div class="flip-container">
      <div class="card-inner" id="inner-03">
        <div class="card front">
          <div class="card-index">N° 03</div>
          <div class="card-tag gold">Résumé de livre</div>
          <div class="card-body">
            <h1 class="title" style="font-size:24px;">Sapiens</h1>
            <p class="book-author">Yuval Noah Harari · 2011</p>
            <p class="lead">Une traversée de l'histoire humaine qui pose une question simple : comment un primate parmi d'autres a fini par dominer la planète.</p>
            <ul class="takeaways">
              <li>La grande bascule vient de notre capacité à croire à des fictions communes — argent, nations, religions — qui permettent à des inconnus de coopérer en masse.</li>
              <li>La révolution agricole a souvent dégradé la vie quotidienne des individus tout en faisant prospérer l'espèce.</li>
              <li>Chaque révolution — cognitive, agricole, scientifique — redéfinit ce que "réussir" veut dire pour l'humanité.</li>
            </ul>
            <div class="sources">
              <div class="sources-label">sources</div>
              <ol>
                <li>Harari, Y. N., Sapiens : une brève histoire de l'humanité, Albin Michel, 2015.</li>
                <li>Entretien de l'auteur, "Harvard Business Review", 2017.</li>
              </ol>
            </div>
          </div>
        </div>
        <div class="card back">
          <div class="card-index">N° 03</div>
          <div class="card-tag back-tag">Pourquoi le lire</div>
          <div class="card-body">
            <p class="back-note">Harari défend une thèse volontairement dérangeante : le passage à l'agriculture n'a pas amélioré la vie des individus, il les a plutôt enchaînés à un travail plus dur pour nourrir une population plus nombreuse. Le livre plaît à qui aime remettre en cause les évidences.</p>
          </div>
        </div>
      </div>
      <div class="card-controls">
        <button class="ctrl-btn like-btn" data-id="03" aria-label="Garder cette fiche"><svg viewBox="0 0 20 18"><path d="M10 17 C2 11 1 5 5.5 2.5 C8 1 10 2.5 10 5 C10 2.5 12 1 14.5 2.5 C19 5 18 11 10 17 Z"/></svg></button>
        <button class="ctrl-btn flip-btn" data-target="inner-03" aria-label="Retourner la fiche"><svg viewBox="0 0 20 20"><path d="M17 10a7 7 0 1 1-2-4.9M17 3v4h-4"/></svg></button>
      </div>
    </div>
  </section>

  <!-- 04 CONCEPT: Pareto -->
  <section class="card-slot">
    <div class="flip-container">
      <div class="card-inner" id="inner-04">
        <div class="card front">
          <div class="card-index">N° 04</div>
          <div class="card-tag">Concept</div>
          <div class="card-body">
            <h1 class="title">La loi de Pareto</h1>
            <p class="lead">Dans beaucoup de situations, environ 80 % des effets proviennent de 20 % des causes. Une minorité de facteurs pèse plus que tout le reste réuni.</p>
            <p class="lead">Ce n'est pas une loi physique exacte, plutôt une régularité qu'on retrouve étonnamment souvent — en économie, en gestion du temps, en informatique.</p>
            <p class="example">20 % des fonctionnalités d'un logiciel concentrent 80 % de son usage réel.</p>
          </div>
        </div>
        <div class="card back">
          <div class="card-index">N° 04</div>
          <div class="card-tag back-tag">Pour aller plus loin</div>
          <div class="card-body">
            <details class="quiz" open>
              <summary>D'où vient cette observation, à l'origine ?</summary>
              <p>Vilfredo Pareto l'a remarquée en étudiant la répartition des terres en Italie : environ 80 % du territoire appartenait à 20 % de la population. Il a ensuite retrouvé le même schéma ailleurs.</p>
            </details>
            <p class="back-note">Le piège : croire que le ratio est toujours exactement 80/20. C'est une tendance, pas une formule.</p>
          </div>
        </div>
      </div>
      <div class="card-controls">
        <button class="ctrl-btn like-btn" data-id="04" aria-label="Garder cette fiche"><svg viewBox="0 0 20 18"><path d="M10 17 C2 11 1 5 5.5 2.5 C8 1 10 2.5 10 5 C10 2.5 12 1 14.5 2.5 C19 5 18 11 10 17 Z"/></svg></button>
        <button class="ctrl-btn flip-btn" data-target="inner-04" aria-label="Retourner la fiche"><svg viewBox="0 0 20 20"><path d="M17 10a7 7 0 1 1-2-4.9M17 3v4h-4"/></svg></button>
      </div>
    </div>
  </section>

  <!-- 05 DIAGRAM: atome -->
  <section class="card-slot">
    <div class="flip-container">
      <div class="card-inner" id="inner-05">
        <div class="card front">
          <div class="card-index">N° 05</div>
          <div class="card-tag gold">Schéma</div>
          <div class="card-body" style="overflow:visible;">
            <h1 class="title" style="font-size:24px;">Structure d'un atome</h1>
            <div class="diagram-wrap">
              <svg viewBox="0 0 360 300" fill="none">
                <circle cx="180" cy="150" r="14" fill="#e7dcb9" stroke="#241f18" stroke-width="1.5"/>
                <circle cx="176" cy="146" r="4.5" fill="#c89b4a"/>
                <circle cx="185" cy="152" r="4.5" fill="#4a7a73"/>
                <circle cx="178" cy="156" r="4.5" fill="#c89b4a"/>
                <ellipse cx="180" cy="150" rx="110" ry="42" stroke="#4a4032" stroke-width="1.2"/>
                <ellipse cx="180" cy="150" rx="110" ry="42" stroke="#4a4032" stroke-width="1.2" transform="rotate(60 180 150)"/>
                <ellipse cx="180" cy="150" rx="110" ry="42" stroke="#4a4032" stroke-width="1.2" transform="rotate(120 180 150)"/>
                <circle cx="290" cy="150" r="5" fill="#4a7a73"/>
                <circle cx="120" cy="65" r="5" fill="#4a7a73"/>
                <circle cx="128" cy="228" r="5" fill="#4a7a73"/>
                <g font-family="IBM Plex Mono" font-size="10.5" fill="#4a4032">
                  <text x="150" y="115">noyau</text>
                  <text x="300" y="145">électron</text>
                </g>
              </svg>
            </div>
            <p class="diagram-caption">Un noyau dense (protons, neutrons) autour duquel les électrons gravitent en couches.</p>
          </div>
        </div>
        <div class="card back">
          <div class="card-index">N° 05</div>
          <div class="card-tag back-tag">Le saviez-vous</div>
          <div class="card-body">
            <p class="back-note">Un atome est presque entièrement vide. Si son noyau avait la taille d'une bille posée au centre d'un stade de football, les électrons tourneraient quelque part du côté des gradins.</p>
          </div>
        </div>
      </div>
      <div class="card-controls">
        <button class="ctrl-btn like-btn" data-id="05" aria-label="Garder cette fiche"><svg viewBox="0 0 20 18"><path d="M10 17 C2 11 1 5 5.5 2.5 C8 1 10 2.5 10 5 C10 2.5 12 1 14.5 2.5 C19 5 18 11 10 17 Z"/></svg></button>
        <button class="ctrl-btn flip-btn" data-target="inner-05" aria-label="Retourner la fiche"><svg viewBox="0 0 20 20"><path d="M17 10a7 7 0 1 1-2-4.9M17 3v4h-4"/></svg></button>
      </div>
    </div>
  </section>

  <!-- 06 BOOK: Thinking fast and slow -->
  <section class="card-slot">
    <div class="flip-container">
      <div class="card-inner" id="inner-06">
        <div class="card front">
          <div class="card-index">N° 06</div>
          <div class="card-tag gold">Résumé de livre</div>
          <div class="card-body">
            <h1 class="title" style="font-size:22px;">Système 1 / Système 2</h1>
            <p class="book-author">Daniel Kahneman · 2011</p>
            <p class="lead">Le psychologue décrit deux modes de pensée qui se partagent nos décisions au quotidien.</p>
            <ul class="takeaways">
              <li>Le système 1 est rapide, intuitif, automatique — il conduit, reconnaît un visage, réagit à une émotion sans effort.</li>
              <li>Le système 2 est lent, délibéré, coûteux en énergie — il entre en jeu pour un calcul ou une décision complexe.</li>
              <li>Beaucoup d'erreurs de jugement viennent du système 1 qui répond à la place du système 2, par paresse cognitive.</li>
            </ul>
            <div class="sources">
              <div class="sources-label">sources</div>
              <ol>
                <li>Kahneman, D., Thinking, Fast and Slow, Farrar, Straus and Giroux, 2011.</li>
                <li>Prix Nobel d'économie 2002, travaux avec Amos Tversky.</li>
              </ol>
            </div>
          </div>
        </div>
        <div class="card back">
          <div class="card-index">N° 06</div>
          <div class="card-tag back-tag">Pourquoi le lire</div>
          <div class="card-body">
            <p class="back-note">Kahneman introduit aussi l'idée de "WYSIATI" — ce que vous voyez est tout ce qui existe : le système 1 construit une histoire cohérente avec les seules informations disponibles, sans se demander ce qui pourrait manquer. Un livre pour qui veut repérer ses propres angles morts.</p>
          </div>
        </div>
      </div>
      <div class="card-controls">
        <button class="ctrl-btn like-btn" data-id="06" aria-label="Garder cette fiche"><svg viewBox="0 0 20 18"><path d="M10 17 C2 11 1 5 5.5 2.5 C8 1 10 2.5 10 5 C10 2.5 12 1 14.5 2.5 C19 5 18 11 10 17 Z"/></svg></button>
        <button class="ctrl-btn flip-btn" data-target="inner-06" aria-label="Retourner la fiche"><svg viewBox="0 0 20 20"><path d="M17 10a7 7 0 1 1-2-4.9M17 3v4h-4"/></svg></button>
      </div>
    </div>
  </section>

  <!-- 07 CONCEPT: Dunning-Kruger -->
  <section class="card-slot">
    <div class="flip-container">
      <div class="card-inner" id="inner-07">
        <div class="card front">
          <div class="card-index">N° 07</div>
          <div class="card-tag">Concept</div>
          <div class="card-body">
            <h1 class="title">L'effet Dunning-Kruger</h1>
            <p class="lead">Moins on connaît un sujet, plus on a tendance à surestimer sa propre compétence — car il faut déjà un peu de savoir pour mesurer ce qu'on ignore.</p>
            <p class="lead">À l'inverse, les personnes réellement compétentes ont souvent tendance à sous-estimer leur niveau, en imaginant que tout le monde en sait autant qu'elles.</p>
            <p class="example">Le débutant confiant après un seul cours de guitare, contrairement au musicien professionnel qui doute encore.</p>
          </div>
        </div>
        <div class="card back">
          <div class="card-index">N° 07</div>
          <div class="card-tag back-tag">Pour aller plus loin</div>
          <div class="card-body">
            <details class="quiz" open>
              <summary>Qui évalue le plus justement son propre niveau ?</summary>
              <p>L'expert s'en approche le plus, même s'il a tendance à se sous-estimer légèrement. Le débutant, lui, se trompe dans les deux sens plus largement — le plus souvent par excès de confiance.</p>
            </details>
          </div>
        </div>
      </div>
      <div class="card-controls">
        <button class="ctrl-btn like-btn" data-id="07" aria-label="Garder cette fiche"><svg viewBox="0 0 20 18"><path d="M10 17 C2 11 1 5 5.5 2.5 C8 1 10 2.5 10 5 C10 2.5 12 1 14.5 2.5 C19 5 18 11 10 17 Z"/></svg></button>
        <button class="ctrl-btn flip-btn" data-target="inner-07" aria-label="Retourner la fiche"><svg viewBox="0 0 20 20"><path d="M17 10a7 7 0 1 1-2-4.9M17 3v4h-4"/></svg></button>
      </div>
    </div>
  </section>

  <!-- 08 DIAGRAM: cycle de l'eau -->
  <section class="card-slot">
    <div class="flip-container">
      <div class="card-inner" id="inner-08">
        <div class="card front">
          <div class="card-index">N° 08</div>
          <div class="card-tag gold">Schéma</div>
          <div class="card-body" style="overflow:visible;">
            <h1 class="title" style="font-size:24px;">Le cycle de l'eau</h1>
            <div class="diagram-wrap">
              <svg viewBox="0 0 360 300" fill="none">
                <path d="M20 230 Q180 260 340 230 L340 260 L20 260 Z" fill="#4a7a73" opacity="0.25"/>
                <path d="M20 230 Q180 260 340 230" stroke="#4a7a73" stroke-width="2"/>
                <ellipse cx="120" cy="70" rx="42" ry="20" fill="#e7dcb9" stroke="#241f18" stroke-width="1.5"/>
                <ellipse cx="150" cy="60" rx="30" ry="16" fill="#e7dcb9" stroke="#241f18" stroke-width="1.5"/>
                <path d="M80 130 Q90 170 100 130" stroke="#4a7a73" stroke-width="2" fill="none" marker-end="url(#arrowt2)"/>
                <path d="M120 130 Q130 175 140 130" stroke="#4a7a73" stroke-width="2" fill="none" marker-end="url(#arrowt2)"/>
                <path d="M160 130 Q170 170 180 130" stroke="#4a7a73" stroke-width="2" fill="none" marker-end="url(#arrowt2)"/>
                <path d="M80 210 C60 170 60 120 90 90" stroke="#c89b4a" stroke-width="2" fill="none" marker-end="url(#arrowg)"/>
                <path d="M240 90 C270 130 260 190 220 218" stroke="#241f18" stroke-width="1.8" fill="none" marker-end="url(#arrowi)"/>
                <g font-family="IBM Plex Mono" font-size="10.5" fill="#4a4032">
                  <text x="20" y="150">évaporation</text>
                  <text x="250" y="150">précipitations</text>
                  <text x="90" y="245">océan</text>
                </g>
                <defs>
                  <marker id="arrowt2" markerWidth="7" markerHeight="7" refX="3.5" refY="3.5" orient="auto"><path d="M0,0 L7,3.5 L0,7 Z" fill="#4a7a73"/></marker>
                  <marker id="arrowg" markerWidth="7" markerHeight="7" refX="3.5" refY="3.5" orient="auto"><path d="M0,0 L7,3.5 L0,7 Z" fill="#c89b4a"/></marker>
                  <marker id="arrowi" markerWidth="7" markerHeight="7" refX="3.5" refY="3.5" orient="auto"><path d="M0,0 L7,3.5 L0,7 Z" fill="#241f18"/></marker>
                </defs>
              </svg>
            </div>
            <p class="diagram-caption">L'eau s'évapore, forme des nuages, retombe en pluie et rejoint l'océan — en boucle continue.</p>
          </div>
        </div>
        <div class="card back">
          <div class="card-index">N° 08</div>
          <div class="card-tag back-tag">Le saviez-vous</div>
          <div class="card-body">
            <p class="back-note">Le volume total d'eau sur Terre ne change quasiment pas depuis des milliards d'années : il ne fait que circuler. L'eau que vous buvez aujourd'hui a déjà traversé le cycle un nombre incalculable de fois.</p>
          </div>
        </div>
      </div>
      <div class="card-controls">
        <button class="ctrl-btn like-btn" data-id="08" aria-label="Garder cette fiche"><svg viewBox="0 0 20 18"><path d="M10 17 C2 11 1 5 5.5 2.5 C8 1 10 2.5 10 5 C10 2.5 12 1 14.5 2.5 C19 5 18 11 10 17 Z"/></svg></button>
        <button class="ctrl-btn flip-btn" data-target="inner-08" aria-label="Retourner la fiche"><svg viewBox="0 0 20 20"><path d="M17 10a7 7 0 1 1-2-4.9M17 3v4h-4"/></svg></button>
      </div>
    </div>
  </section>

  <!-- 09 BOOK: Atomic Habits -->
  <section class="card-slot">
    <div class="flip-container">
      <div class="card-inner" id="inner-09">
        <div class="card front">
          <div class="card-index">N° 09</div>
          <div class="card-tag gold">Résumé de livre</div>
          <div class="card-body">
            <h1 class="title" style="font-size:24px;">Atomic Habits</h1>
            <p class="book-author">James Clear · 2018</p>
            <p class="lead">Un guide pratique sur la construction des habitudes, centré sur une idée : de petits changements réguliers composent, comme des intérêts.</p>
            <ul class="takeaways">
              <li>On n'atteint pas le niveau de ses objectifs, on tombe au niveau de ses systèmes — mieux vaut soigner le processus que fixer un but.</li>
              <li>Chaque habitude suit un cycle en quatre temps : signal, envie, réponse, récompense.</li>
              <li>Changer durablement demande de modifier l'identité qu'on se donne, pas seulement le comportement.</li>
            </ul>
            <div class="sources">
              <div class="sources-label">sources</div>
              <ol>
                <li>Clear, J., Atomic Habits, Avery, 2018.</li>
                <li>Notes de recherche de l'auteur sur jamesclear.com.</li>
              </ol>
            </div>
          </div>
        </div>
        <div class="card back">
          <div class="card-index">N° 09</div>
          <div class="card-tag back-tag">Pourquoi le lire</div>
          <div class="card-body">
            <p class="back-note">L'idée la plus utile du livre n'est peut-être pas sur la motivation, mais sur l'environnement : Clear montre qu'il est souvent plus efficace de rendre une mauvaise habitude physiquement plus contraignante que de compter sur sa volonté pour y résister.</p>
          </div>
        </div>
      </div>
      <div class="card-controls">
        <button class="ctrl-btn like-btn" data-id="09" aria-label="Garder cette fiche"><svg viewBox="0 0 20 18"><path d="M10 17 C2 11 1 5 5.5 2.5 C8 1 10 2.5 10 5 C10 2.5 12 1 14.5 2.5 C19 5 18 11 10 17 Z"/></svg></button>
        <button class="ctrl-btn flip-btn" data-target="inner-09" aria-label="Retourner la fiche"><svg viewBox="0 0 20 20"><path d="M17 10a7 7 0 1 1-2-4.9M17 3v4h-4"/></svg></button>
      </div>
    </div>
  </section>

  <section class="card-slot">
    <div class="flip-container"><div class="card-inner"><div class="card">
      <div class="card-index">N° 10</div>
      <h1 class="title" style="font-size:30px;">Vous êtes à jour.</h1>
      <p class="lead" style="margin-top:10px;">Dix fiches, trois formats, une seule règle : rien n'est affirmé sans qu'on puisse en retrouver la source.</p>
      <p class="example">Remontez pour relire une fiche, ou revenez demain pour la suite.</p>
    </div></div></div>
  </section>

</div>

<div id="nav"></div>
<div class="hint" id="hint">faites glisser vers le haut</div>

<!-- COMPOSE OVERLAY -->
<div class="overlay" id="compose-overlay">
  <div class="modal-panel">
    <div class="modal-head">
      <h2>Nouvelle fiche</h2>
      <button class="modal-close" id="compose-close">fermer ✕</button>
    </div>
    <div class="modal-body">
      <div class="mode-toggle">
        <button type="button" class="mode-btn active" data-mode="photo">Photo</button>
        <button type="button" class="mode-btn" data-mode="text">Texte</button>
      </div>

      <div id="compose-photo-fields">
        <span class="field-label">Recto</span>
        <label class="file-btn" for="compose-file-front">Choisir une image</label>
        <input type="file" id="compose-file-front" accept="image/*" style="display:none;">
        <img id="compose-preview-front" class="compose-preview" alt="Aperçu recto">

        <span class="field-label">Verso <span style="opacity:0.6;">(optionnel — pour pouvoir retourner la fiche)</span></span>
        <label class="file-btn" for="compose-file-back">Choisir une image</label>
        <input type="file" id="compose-file-back" accept="image/*" style="display:none;">
        <img id="compose-preview-back" class="compose-preview" alt="Aperçu verso">
      </div>

      <div id="compose-text-fields" style="display:none;">
        <span class="field-label">Titre</span>
        <input type="text" id="compose-title" placeholder="Le titre de votre fiche" style="width:100%; font-family:'Fraunces', serif; font-size:19px; padding:8px 10px; border:1px solid var(--rule); border-radius:4px; margin-bottom:14px; background:#ffffff40; color:var(--ink);">

        <span class="field-label">Texte</span>
        <div class="text-toolbar">
          <button type="button" class="tb-btn" data-action="bold" title="Gras"><strong>G</strong></button>
          <button type="button" class="tb-btn" data-action="highlight" title="Surligner">Surligner</button>
          <button type="button" class="tb-btn" data-action="newline" title="Aller à la ligne">↵ Ligne</button>
          <button type="button" class="tb-btn" data-action="space" title="Espacement">␣ Espace</button>
        </div>
        <textarea id="compose-text" placeholder="Votre idée, expliquée en quelques phrases…" style="min-height:140px;"></textarea>

        <span class="field-label">Légende <span style="opacity:0.6;">(optionnel — remplace votre nom en signature)</span></span>
        <input type="text" id="compose-legend" placeholder="Vous" style="width:100%; font-family:'IBM Plex Mono', monospace; font-size:13px; padding:8px 10px; border:1px solid var(--rule); border-radius:4px; margin-bottom:14px; background:#ffffff40; color:var(--ink);">
      </div>

      <div class="modal-actions">
        <button class="btn" id="compose-cancel">Annuler</button>
        <button class="btn primary" id="compose-submit" disabled>Publier</button>
      </div>
    </div>
  </div>
</div>

<!-- MESSAGES OVERLAY -->
<div class="overlay" id="messages-overlay">
  <div class="modal-panel">
    <div class="modal-head">
      <h2>Messagerie</h2>
      <button class="modal-close" id="messages-close">fermer ✕</button>
    </div>
    <div class="modal-body">
      <div class="profile-chip" style="margin-bottom:14px;">
        Vous discutez en tant que <strong id="profile-name">Vous</strong>
        <button id="change-profile">changer</button>
      </div>

      <div id="list-view">
        <span class="field-label">Démo — ce navigateur simule plusieurs comptes. Tapez un nom pour lui écrire.</span>
        <input type="text" id="add-contact" placeholder="Nom d'un contact (ex. Léa)">
        <ul id="contact-list"></ul>
        <p class="empty-note" id="no-contacts">Aucune conversation pour l'instant.</p>
      </div>

      <div id="thread-view">
        <button id="thread-back">← retour aux conversations</button>
        <div id="thread-messages"></div>
        <div id="thread-input-row">
          <input type="text" id="thread-input" placeholder="Écrire un message…">
          <button class="btn primary" id="thread-send">Envoyer</button>
        </div>
      </div>
    </div>
  </div>
</div>

<script>
  const feed = document.getElementById('feed');
  const nav = document.getElementById('nav');
  const hint = document.getElementById('hint');
  const favCountEl = document.getElementById('fav-count');
  let favCount = 0;

  // ---------- feed / nav rebuild (runs again whenever a post is added) ----------
  let io = null;
  function rebuildFeedControls(){
    const slots = document.querySelectorAll('.card-slot');
    nav.innerHTML = '';
    slots.forEach((slot, i) => {
      const b = document.createElement('button');
      b.addEventListener('click', () => slot.scrollIntoView({behavior:'smooth'}));
      nav.appendChild(b);
    });
    const dots = nav.querySelectorAll('button');
    if (io) io.disconnect();
    io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const idx = [...slots].indexOf(entry.target);
        if (entry.isIntersecting){
          entry.target.classList.add('in-view');
          dots.forEach(d => d.classList.remove('active'));
          dots[idx].classList.add('active');
          if (idx > 0) hint.style.opacity = '0';
        } else {
          entry.target.classList.remove('in-view');
        }
      });
    }, { threshold: 0.6 });
    slots.forEach(s => io.observe(s));
  }

  // flip buttons (static + delegated for future ones, though posts have no back face)
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.flip-btn');
    if (!btn) return;
    const inner = document.getElementById(btn.dataset.target);
    if (inner) inner.classList.toggle('flipped');
  });

  // ---------- likes (works for hardcoded cards AND user posts) ----------
  async function wireLikeButton(btn){
    const id = btn.dataset.id;
    try{
      const res = await window.storage.get('liked:' + id, false);
      if (res && res.value === 'true'){
        btn.classList.add('liked');
        favCount++;
        favCountEl.textContent = favCount;
      }
    }catch(e){ /* not liked yet */ }
    btn.addEventListener('click', async () => {
      const nowLiked = !btn.classList.contains('liked');
      btn.classList.toggle('liked', nowLiked);
      favCount += nowLiked ? 1 : -1;
      favCountEl.textContent = favCount;
      try{ await window.storage.set('liked:' + id, String(nowLiked), false); }catch(e){}
    });
  }

  // ---------- profile (simulated identity for this browser) ----------
  const profileNameEl = document.getElementById('profile-name');
  let activeProfile = 'Vous';
  async function loadProfile(){
    try{
      const res = await window.storage.get('activeProfile', false);
      if (res && res.value) activeProfile = res.value;
    }catch(e){}
    profileNameEl.textContent = activeProfile;
  }
  document.getElementById('change-profile').addEventListener('click', async () => {
    const name = prompt('Se connecter en tant que (nom du profil simulé) :', activeProfile);
    if (name && name.trim()){
      activeProfile = name.trim();
      profileNameEl.textContent = activeProfile;
      try{ await window.storage.set('activeProfile', activeProfile, false); }catch(e){}
      renderContactList();
      if (!threadView.classList.contains('active')){} else { openThread(currentContact); }
    }
  });

  // ---------- compose (photo OR text post) ----------
  const composeOverlay = document.getElementById('compose-overlay');
  const composeFileFront = document.getElementById('compose-file-front');
  const composeFileBack = document.getElementById('compose-file-back');
  const composePreviewFront = document.getElementById('compose-preview-front');
  const composePreviewBack = document.getElementById('compose-preview-back');
  const composePhotoFields = document.getElementById('compose-photo-fields');
  const composeTextFields = document.getElementById('compose-text-fields');
  const composeTitle = document.getElementById('compose-title');
  const composeText = document.getElementById('compose-text');
  const composeLegend = document.getElementById('compose-legend');
  const composeSubmit = document.getElementById('compose-submit');
  const modeBtns = document.querySelectorAll('.mode-btn');
  let pendingFront = null;
  let pendingBack = null;
  let composeMode = 'photo';

  function insertAtCursor(textarea, text){
    const start = textarea.selectionStart, end = textarea.selectionEnd;
    const val = textarea.value;
    textarea.value = val.slice(0, start) + text + val.slice(end);
    textarea.selectionStart = textarea.selectionEnd = start + text.length;
    textarea.focus();
  }
  function wrapSelection(textarea, before, after){
    const start = textarea.selectionStart, end = textarea.selectionEnd;
    const val = textarea.value;
    const selected = val.slice(start, end) || 'texte';
    textarea.value = val.slice(0, start) + before + selected + after + val.slice(end);
    textarea.selectionStart = start + before.length;
    textarea.selectionEnd = start + before.length + selected.length;
    textarea.focus();
  }
  document.querySelectorAll('.tb-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const action = btn.dataset.action;
      if (action === 'bold') wrapSelection(composeText, '**', '**');
      else if (action === 'highlight') wrapSelection(composeText, '==', '==');
      else if (action === 'newline') insertAtCursor(composeText, '\n');
      else if (action === 'space') insertAtCursor(composeText, '\n\n');
      updateSubmitState();
    });
  });

  modeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      composeMode = btn.dataset.mode;
      modeBtns.forEach(b => b.classList.toggle('active', b === btn));
      composePhotoFields.style.display = composeMode === 'photo' ? 'block' : 'none';
      composeTextFields.style.display = composeMode === 'text' ? 'block' : 'none';
      updateSubmitState();
    });
  });

  function updateSubmitState(){
    if (composeMode === 'photo'){
      composeSubmit.disabled = !pendingFront;
    } else {
      composeSubmit.disabled = composeText.value.trim().length === 0;
    }
  }
  composeText.addEventListener('input', updateSubmitState);
  composeTitle.addEventListener('input', updateSubmitState);

  document.getElementById('compose-btn').addEventListener('click', () => {
    composeOverlay.classList.add('open');
  });
  document.getElementById('compose-close').addEventListener('click', closeCompose);
  document.getElementById('compose-cancel').addEventListener('click', closeCompose);
  function closeCompose(){
    composeOverlay.classList.remove('open');
    composeFileFront.value = '';
    composeFileBack.value = '';
    composePreviewFront.style.display = 'none';
    composePreviewBack.style.display = 'none';
    composeTitle.value = '';
    composeText.value = '';
    composeLegend.value = '';
    pendingFront = null;
    pendingBack = null;
    composeSubmit.disabled = true;
  }

  function readAndResize(file, callback){
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const maxW = 900;
        const scale = Math.min(1, maxW / img.width);
        const canvas = document.createElement('canvas');
        canvas.width = img.width * scale;
        canvas.height = img.height * scale;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        callback(canvas.toDataURL('image/jpeg', 0.72));
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }

  composeFileFront.addEventListener('change', () => {
    const file = composeFileFront.files[0];
    if (!file) return;
    readAndResize(file, (dataUrl) => {
      pendingFront = dataUrl;
      composePreviewFront.src = dataUrl;
      composePreviewFront.style.display = 'block';
      updateSubmitState();
    });
  });

  composeFileBack.addEventListener('change', () => {
    const file = composeFileBack.files[0];
    if (!file) return;
    readAndResize(file, (dataUrl) => {
      pendingBack = dataUrl;
      composePreviewBack.src = dataUrl;
      composePreviewBack.style.display = 'block';
    });
  });

  composeSubmit.addEventListener('click', async () => {
    let post;
    if (composeMode === 'photo'){
      if (!pendingFront) return;
      post = {
        id: 'post-' + Date.now(),
        type: 'photo',
        author: activeProfile,
        imageFront: pendingFront,
        imageBack: pendingBack,
        ts: Date.now()
      };
    } else {
      const body = composeText.value.trim();
      if (!body) return;
      post = {
        id: 'post-' + Date.now(),
        type: 'text',
        author: activeProfile,
        title: composeTitle.value.trim(),
        body: body,
        legend: composeLegend.value.trim(),
        ts: Date.now()
      };
    }
    await savePost(post);
    renderPost(post, true);
    rebuildFeedControls();
    closeCompose();
  });

  async function savePost(post){
    let posts = [];
    try{
      const res = await window.storage.get('posts', false);
      if (res && res.value) posts = JSON.parse(res.value);
    }catch(e){}
    posts.unshift(post);
    try{ await window.storage.set('posts', JSON.stringify(posts), false); }catch(e){}
  }

  async function deletePost(id, sectionEl){
    let posts = [];
    try{
      const res = await window.storage.get('posts', false);
      if (res && res.value) posts = JSON.parse(res.value);
    }catch(e){}
    posts = posts.filter(p => p.id !== id);
    try{ await window.storage.set('posts', JSON.stringify(posts), false); }catch(e){}
    sectionEl.remove();
    rebuildFeedControls();
  }

  const anchor = document.getElementById('user-posts-anchor');
  function renderPost(post, prepend){
    const innerId = 'inner-' + post.id;
    const section = document.createElement('section');
    section.className = 'card-slot';

    let cardHtml;
    if (post.type === 'text'){
      cardHtml = `
        <div class="card-inner" id="${innerId}">
          <div class="card">
            <div class="card-index">Post</div>
            <div class="card-tag gold">Publication</div>
            <div class="card-body">
              ${post.title ? `<h1 class="title" style="font-size:24px;">${escapeHtml(post.title)}</h1>` : ''}
              <p class="lead">${formatBody(post.body)}</p>
              <p class="example post-legend" style="margin-top:auto;">${escapeHtml(post.legend || post.author)}</p>
            </div>
          </div>
        </div>`;
    } else {
      const hasBack = !!post.imageBack;
      cardHtml = `
        <div class="card-inner" id="${innerId}">
          <div class="card photo front">
            <div class="card-body">
              <img class="post-photo" src="${post.imageFront}" alt="">
            </div>
          </div>
          ${hasBack ? `
          <div class="card photo back">
            <div class="card-body">
              <img class="post-photo" src="${post.imageBack}" alt="">
            </div>
          </div>` : ''}
        </div>`;
    }

    const hasBack = post.type === 'photo' && !!post.imageBack;
    section.innerHTML = `
      <div class="flip-container">
        ${cardHtml}
        ${post.author === activeProfile ? `<button class="delete-btn" aria-label="Supprimer"><svg viewBox="0 0 20 20"><path d="M4 5h12 M8 5V3h4v2 M6 5l1 12h6l1-12"/></svg></button>` : ''}
        <div class="card-controls">
          <button class="ctrl-btn like-btn" data-id="${post.id}" aria-label="Garder cette fiche"><svg viewBox="0 0 20 18"><path d="M10 17 C2 11 1 5 5.5 2.5 C8 1 10 2.5 10 5 C10 2.5 12 1 14.5 2.5 C19 5 18 11 10 17 Z"/></svg></button>
          ${hasBack ? `<button class="ctrl-btn flip-btn" data-target="${innerId}" aria-label="Retourner la fiche"><svg viewBox="0 0 20 20"><path d="M17 10a7 7 0 1 1-2-4.9M17 3v4h-4"/></svg></button>` : ''}
        </div>
      </div>
    `;
    anchor.after(section);
    const del = section.querySelector('.delete-btn');
    if (del) del.addEventListener('click', () => deletePost(post.id, section));
    wireLikeButton(section.querySelector('.like-btn'));
  }

  function escapeHtml(str){
    const d = document.createElement('div');
    d.textContent = str || '';
    return d.innerHTML;
  }

  function formatBody(str){
    let safe = escapeHtml(str);
    safe = safe.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    safe = safe.replace(/==(.+?)==/g, '<mark>$1</mark>');
    return safe;
  }

  async function loadPosts(){
    try{
      const res = await window.storage.get('posts', false);
      if (res && res.value){
        const posts = JSON.parse(res.value);
        posts.slice().reverse().forEach(p => {
          if (!p.imageFront && p.image) p.imageFront = p.image; // compat anciens posts
          renderPost(p, false);
        });
      }
    }catch(e){}
  }

  // ---------- messaging (simulated multi-user within this browser) ----------
  const msgBtn = document.getElementById('msg-btn');
  const messagesOverlay = document.getElementById('messages-overlay');
  const listView = document.getElementById('list-view');
  const threadView = document.getElementById('thread-view');
  const contactListEl = document.getElementById('contact-list');
  const noContactsEl = document.getElementById('no-contacts');
  const addContactInput = document.getElementById('add-contact');
  const threadMessagesEl = document.getElementById('thread-messages');
  const threadInput = document.getElementById('thread-input');
  let currentContact = null;

  msgBtn.addEventListener('click', () => {
    messagesOverlay.classList.add('open');
    showList();
    renderContactList();
  });
  document.getElementById('messages-close').addEventListener('click', () => {
    messagesOverlay.classList.remove('open');
  });

  function showList(){
    listView.style.display = 'block';
    threadView.classList.remove('active');
  }
  function showThread(){
    listView.style.display = 'none';
    threadView.classList.add('active');
  }
  document.getElementById('thread-back').addEventListener('click', showList);

  async function getAllMessages(){
    try{
      const res = await window.storage.get('messages', false);
      if (res && res.value) return JSON.parse(res.value);
    }catch(e){}
    return [];
  }
  async function saveAllMessages(msgs){
    try{ await window.storage.set('messages', JSON.stringify(msgs), false); }catch(e){}
  }

  async function renderContactList(){
    const msgs = await getAllMessages();
    const partners = new Set();
    msgs.forEach(m => {
      if (m.from === activeProfile) partners.add(m.to);
      if (m.to === activeProfile) partners.add(m.from);
    });
    contactListEl.innerHTML = '';
    if (partners.size === 0){
      noContactsEl.style.display = 'block';
    } else {
      noContactsEl.style.display = 'none';
      [...partners].forEach(name => {
        const li = document.createElement('li');
        li.textContent = name;
        li.addEventListener('click', () => openThread(name));
        contactListEl.appendChild(li);
      });
    }
  }

  addContactInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && addContactInput.value.trim()){
      const name = addContactInput.value.trim();
      addContactInput.value = '';
      if (name !== activeProfile) openThread(name);
    }
  });

  async function openThread(name){
    currentContact = name;
    showThread();
    await renderThreadMessages();
  }

  async function renderThreadMessages(){
    const msgs = await getAllMessages();
    const thread = msgs.filter(m =>
      (m.from === activeProfile && m.to === currentContact) ||
      (m.from === currentContact && m.to === activeProfile)
    ).sort((a,b) => a.ts - b.ts);
    threadMessagesEl.innerHTML = '';
    if (thread.length === 0){
      threadMessagesEl.innerHTML = '<p class="empty-note">Aucun message avec ' + escapeHtml(currentContact) + ' pour l\'instant.</p>';
    }
    thread.forEach(m => {
      const div = document.createElement('div');
      div.className = 'msg-bubble ' + (m.from === activeProfile ? 'mine' : 'theirs');
      div.innerHTML = escapeHtml(m.text) + `<div class="msg-meta">${escapeHtml(m.from)}</div>`;
      threadMessagesEl.appendChild(div);
    });
    threadMessagesEl.scrollTop = threadMessagesEl.scrollHeight;
  }

  async function sendMessage(){
    const text = threadInput.value.trim();
    if (!text || !currentContact) return;
    threadInput.value = '';
    const msgs = await getAllMessages();
    msgs.push({ from: activeProfile, to: currentContact, text, ts: Date.now() });
    await saveAllMessages(msgs);
    await renderThreadMessages();
  }
  document.getElementById('thread-send').addEventListener('click', sendMessage);
  threadInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') sendMessage(); });

  // ---------- boot ----------
  async function boot(){
    rebuildFeedControls();
    document.querySelectorAll('.like-btn').forEach(wireLikeButton);
    if (window.storage){
      await loadProfile();
      await loadPosts();
      rebuildFeedControls();
    }
  }
  boot();
</script>

</body>
</html>
