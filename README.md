
<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover, maximum-scale=1">
<title>Marges</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap" rel="stylesheet">
<style>
  :root{
    --vanilla:#FFF7E6;
    --blush:#F7C8D3;
    --rosewood:#B46A72;
    --sage:#A8B58A;
    --misty:#A9B7C6;
    --midnight:#2D3A47;
    --bg:var(--midnight);
    --paper:var(--vanilla);
    --paper-shadow:#e8deca;
    --ink:var(--midnight);
    --ink-soft:#59636d;
    --gold:var(--sage);
    --rust:var(--rosewood);
    --teal:var(--misty);
    --rule:rgba(45,58,71,.18);
  }
  *{box-sizing:border-box;}
  html,body{margin:0;padding:0;}
  body{
    background: var(--bg);
    font-family:'Times New Roman', Times, serif;
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
    font-family:'Montserrat', Arial, sans-serif;
    font-size:11px;
    letter-spacing:0.04em;
    color: var(--ink-soft);
  }
  .card-tag{
    align-self:flex-start;
    margin-left:26px;
    margin-top:2px;
    font-family:'Montserrat', Arial, sans-serif;
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
    font-family:'Times New Roman', Times, serif;
    font-weight:600;
    font-size: clamp(26px,7vw,32px);
    line-height:1.08;
    margin:0 0 4px;
  }
  .subtitle{
    font-family:'Montserrat', Arial, sans-serif;
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
    font-family:'Montserrat', Arial, sans-serif;
    font-size:12px;
    color: var(--ink-soft);
    margin:0 0 14px;
  }
  ul.takeaways{ margin:0 0 14px; padding-left:18px; }
  ul.takeaways li{ font-size:15px; line-height:1.45; margin-bottom:7px; }
  .sources{ margin-top:auto; padding-top:12px; border-top:1px solid var(--rule); }
  .sources-label{
    font-family:'Montserrat', Arial, sans-serif;
    font-size:10.5px;
    color: var(--gold);
    margin-bottom:6px;
  }
  .sources ol{ margin:0; padding-left:16px; }
  .sources li{
    font-family:'Montserrat', Arial, sans-serif;
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
    font-family:'Montserrat', Arial, sans-serif;
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
    border:1px solid rgba(255,247,230,0.5);
    background: rgba(45,58,71,0.55);
    backdrop-filter: blur(3px);
    display:flex;
    align-items:center;
    justify-content:center;
    cursor:pointer;
    transition: transform 0.15s ease, background 0.2s ease;
  }
  .ctrl-btn:active{ transform: scale(0.88); }
  .ctrl-btn svg{ width:19px; height:19px; }
  .like-btn svg path{ fill:none; stroke:#FFF7E6; stroke-width:1.7; transition: fill .2s, stroke .2s; }
  .like-btn.liked svg path{ fill: var(--rust); stroke: var(--rust); }
  .flip-btn svg path{ fill:none; stroke:#FFF7E6; stroke-width:1.6; }

  #fav-counter{
    position:fixed;
    top:16px; left:16px;
    font-family:'Montserrat', Arial, sans-serif;
    font-size:12px;
    color: var(--paper);
    background: rgba(255,247,230,0.08);
    border:1px solid rgba(255,247,230,0.2);
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
    background: rgba(255,247,230,0.25);
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
    font-family:'Montserrat', Arial, sans-serif;
    font-size:10.5px;
    color: rgba(255,247,230,0.4);
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
    font-family:'Montserrat', Arial, sans-serif;
    font-size:12px;
    color: var(--paper);
    background: rgba(255,247,230,0.08);
    border:1px solid rgba(255,247,230,0.2);
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
    font-family:'Times New Roman', Times, serif;
    font-size:19px;
    margin:0;
    font-weight:600;
  }
  .modal-close{
    background:none; border:none; cursor:pointer;
    font-family:'Montserrat', Arial, sans-serif;
    font-size:13px; color: var(--ink-soft);
  }
  .modal-body{ padding:16px 18px 18px; overflow-y:auto; }
  .field-label{
    font-family:'Montserrat', Arial, sans-serif;
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
    font-family:'Montserrat', Arial, sans-serif;
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
    font-family:'Montserrat', Arial, sans-serif;
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
    font-family:'Montserrat', Arial, sans-serif;
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
    font-family:'Times New Roman', Times, serif;
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
    font-family:'Montserrat', Arial, sans-serif;
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
    font-family:'Montserrat', Arial, sans-serif;
    font-size:11px;
    color: var(--ink-soft);
    display:flex;
    align-items:center;
    gap:8px;
  }
  .profile-chip button{
    background:none;border:none;color:var(--rust);
    font-family:'Montserrat', Arial, sans-serif;
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
    font-family:'Times New Roman', Times, serif;
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
    font-family:'Montserrat', Arial, sans-serif;
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
    background: rgba(169,183,198,0.28);
    color: var(--ink);
    border-bottom-left-radius:3px;
  }
  .msg-meta{
    font-family:'Montserrat', Arial, sans-serif;
    font-size:9.5px;
    color: var(--ink-soft);
    margin-top:2px;
  }
  #thread-input-row{ display:flex; gap:8px; }
  #thread-input{
    flex:1;
    font-family:'Times New Roman', Times, serif;
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
    border:1px solid rgba(255,247,230,0.5);
    background: rgba(45,58,71,0.55);
    backdrop-filter: blur(3px);
    display:flex;
    align-items:center;
    justify-content:center;
    cursor:pointer;
  }
  .delete-btn svg{ width:14px; height:14px; }
  .delete-btn svg path{ fill:none; stroke:#FFF7E6; stroke-width:1.7; }

  /* V4 — discovery + library, while keeping the original visual language */
  #library-btn{position:fixed;bottom:20px;right:16px;z-index:10;width:52px;height:52px;border-radius:50%;border:1px solid rgba(255,247,230,.26);background:rgba(45,58,71,.78);color:var(--paper);display:flex;align-items:center;justify-content:center;cursor:pointer;box-shadow:0 8px 20px rgba(0,0,0,.28);font-family:'Montserrat',Arial,sans-serif;font-size:18px}
  #library-btn:active{transform:scale(.92)}
  .wide-panel{max-width:520px}
  .library-tools{display:grid;grid-template-columns:1fr auto;gap:8px;margin-bottom:12px}
  #library-search,.select-field{width:100%;font-family:'Times New Roman',Times,serif;font-size:15px;padding:10px 11px;border:1px solid var(--rule);border-radius:5px;background:#ffffff66;color:var(--ink)}
  .select-field{font-family:'Montserrat',Arial,sans-serif;font-size:12px}
  .filter-row{display:flex;gap:6px;flex-wrap:wrap;margin-bottom:14px}
  .filter-chip{border:1px solid var(--rule);background:transparent;color:var(--ink);border-radius:100px;padding:7px 10px;font:500 10.5px 'Montserrat',Arial,sans-serif;cursor:pointer}
  .filter-chip.active{background:var(--ink);color:var(--paper)}
  #library-results{display:flex;flex-direction:column;gap:8px;max-height:46vh;overflow:auto;padding-right:2px}
  .library-item{border:1px solid var(--rule);border-radius:6px;padding:11px 12px;background:#ffffff38;cursor:pointer}
  .library-item:hover{background:#ffffff66}
  .library-item-top{display:flex;justify-content:space-between;gap:10px;align-items:center;margin-bottom:4px}
  .library-item-title{font:700 17px/1.1 'Times New Roman',Times,serif}
  .library-item-type{font:600 9.5px 'Montserrat',Arial,sans-serif;text-transform:uppercase;letter-spacing:.05em;color:var(--rosewood)}
  .library-item-excerpt{font-size:13px;line-height:1.35;color:var(--ink-soft)}
  .library-footer{display:flex;gap:8px;flex-wrap:wrap;padding-top:14px;margin-top:14px;border-top:1px solid var(--rule)}
  #import-file{display:none}
  .compose-type-wrap{margin-bottom:14px}
  .schema-builder{display:none;margin:4px 0 14px;padding:12px;border:1px solid var(--rule);border-radius:6px;background:#ffffff38}
  .schema-builder.open{display:block}
  .schema-grid{display:grid;grid-template-columns:1fr;gap:8px}
  .schema-node{display:flex;align-items:center;gap:8px}
  .schema-node input{flex:1;font-family:'Times New Roman',Times,serif;font-size:15px;padding:9px 10px;border:1px solid var(--rule);border-radius:4px;background:#ffffff66;color:var(--ink)}
  .schema-arrow{text-align:center;font:700 18px 'Times New Roman',Times,serif;color:var(--rosewood);line-height:1}
  .schema-note{font-size:11px;color:var(--ink-soft);font-style:italic;margin-top:8px}
  .schema-card{display:flex;flex-direction:column;gap:8px;margin-top:12px}
  .schema-card-node{padding:11px 12px;border:1px solid var(--rule);border-radius:5px;background:rgba(168,181,138,.28);font-size:16px;font-weight:700;text-align:center}
  .schema-card-arrow{text-align:center;font-size:20px;color:var(--rosewood);line-height:.8}
  .folder-bar{display:flex;gap:7px;align-items:center;flex-wrap:wrap;margin:0 0 12px}
  .folder-chip{border:1px solid var(--rule);background:transparent;color:var(--ink);border-radius:100px;padding:7px 10px;font:500 10.5px 'Montserrat',Arial,sans-serif;cursor:pointer}
  .folder-chip.active{background:var(--ink);color:var(--paper)}
  .folder-add{width:32px;height:32px;border-radius:50%;border:1px solid var(--ink);background:transparent;color:var(--ink);font:16px 'Montserrat',Arial,sans-serif;cursor:pointer}
  .library-item-actions{display:flex;gap:6px;align-items:center;margin-top:8px}
  .library-folder-select{flex:1;font:500 10px 'Montserrat',Arial,sans-serif;padding:6px 8px;border:1px solid var(--rule);border-radius:4px;background:#ffffff66;color:var(--ink)}
  .library-star{border:1px solid var(--rule);background:transparent;border-radius:4px;padding:5px 8px;cursor:pointer;color:var(--ink)}
  .compose-type-help{font-size:12px;color:var(--ink-soft);margin-top:5px;font-style:italic}
  .post-tools{position:absolute;top:14px;right:14px;z-index:7;display:flex;gap:7px;opacity:0;pointer-events:none;transition:opacity .18s ease}
  .card-slot:hover .post-tools,.card-slot:focus-within .post-tools{opacity:1;pointer-events:auto}
  .post-tool-btn{width:34px;height:34px;border-radius:50%;border:1px solid rgba(255,247,230,.5);background:rgba(45,58,71,.62);color:var(--paper);display:flex;align-items:center;justify-content:center;cursor:pointer;font:600 12px 'Montserrat',Arial,sans-serif;backdrop-filter:blur(3px)}
  .delete-btn{position:static}
  .status-toast{position:fixed;left:50%;bottom:84px;transform:translateX(-50%) translateY(10px);z-index:90;background:var(--paper);color:var(--ink);border:1px solid var(--rule);border-radius:100px;padding:8px 13px;font:500 11px 'Montserrat',Arial,sans-serif;opacity:0;pointer-events:none;transition:.25s;box-shadow:0 8px 20px rgba(0,0,0,.2)}
  .status-toast.show{opacity:1;transform:translateX(-50%) translateY(0)}
  .library-delete{border:1px solid var(--rule);background:transparent;border-radius:4px;padding:5px 8px;cursor:pointer;color:var(--rosewood);font:600 12px 'Montserrat',Arial,sans-serif}
  .library-delete:hover{background:rgba(180,106,114,.12)}
  .static-tools{top:14px;right:14px}
  .deleted-card{display:none!important}
  .hidden-by-filter{display:none!important}
  @media(max-width:480px){.library-tools{grid-template-columns:1fr}.wide-panel{max-width:100%}}


/* =========================================================
   MARGES V5 — adaptation mobile / téléphone
   ========================================================= */

/* Meilleure gestion des hauteurs réelles des navigateurs mobiles */
html {
  height: 100%;
  -webkit-text-size-adjust: 100%;
  text-size-adjust: 100%;
}

body {
  min-height: 100%;
  overscroll-behavior: none;
  -webkit-tap-highlight-color: transparent;
}

#feed {
  height: 100dvh;
  min-height: 100svh;
  overscroll-behavior-y: contain;
  -webkit-overflow-scrolling: touch;
  scroll-padding-top: env(safe-area-inset-top);
}

section.card-slot {
  height: 100dvh;
  min-height: 100svh;
  padding:
    calc(58px + env(safe-area-inset-top))
    max(12px, env(safe-area-inset-right))
    calc(78px + env(safe-area-inset-bottom))
    max(12px, env(safe-area-inset-left));
}

.flip-container {
  width: 100%;
  max-width: 520px;
  height: 100%;
  max-height: none;
  min-height: 0;
  transform: scale(.985);
}

.card-slot.in-view .flip-container {
  transform: scale(1);
}

.card {
  border-radius: 12px;
  padding:
    calc(30px + env(safe-area-inset-top))
    clamp(18px, 5vw, 30px)
    calc(72px + env(safe-area-inset-bottom));
  overflow: hidden;
}

.card::before {
  top: 18px;
  left: 18px;
}

.card-index {
  top: 16px;
  right: 18px;
}

.card-tag {
  margin-left: 20px;
  margin-top: 0;
  font-size: 10px;
  max-width: calc(100% - 70px);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.card-body {
  margin-top: 14px;
  padding-top: 12px;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
}

.card-body::-webkit-scrollbar {
  display: none;
}

h1.title {
  font-size: clamp(25px, 8vw, 34px);
  overflow-wrap: anywhere;
}

p.lead {
  font-size: clamp(15px, 4.5vw, 17px);
  line-height: 1.48;
}

.example {
  font-size: 13px;
  line-height: 1.45;
}

.book-author {
  font-size: 11px;
}

ul.takeaways {
  padding-left: 17px;
}

ul.takeaways li {
  font-size: 14px;
  line-height: 1.42;
  margin-bottom: 8px;
}

.sources {
  flex-shrink: 0;
}

.sources li {
  font-size: 10px;
  line-height: 1.42;
}

.diagram-wrap {
  min-height: 150px;
  padding: 4px 0;
}

.diagram-wrap svg {
  width: min(100%, 360px);
  max-height: 42vh;
}

.diagram-caption {
  font-size: 12px;
  line-height: 1.35;
  flex-shrink: 0;
}

/* Les contrôles restent faciles à toucher au pouce */
.card-controls {
  bottom: calc(12px + env(safe-area-inset-bottom));
  padding: 0 12px;
}

.ctrl-btn {
  width: 46px;
  height: 46px;
  touch-action: manipulation;
}

#fav-counter,
#msg-btn {
  top: calc(10px + env(safe-area-inset-top));
}

#fav-counter {
  left: calc(10px + env(safe-area-inset-left));
  font-size: 11px;
}

#msg-btn {
  right: calc(10px + env(safe-area-inset-right));
  padding: 7px 10px;
  min-height: 36px;
  touch-action: manipulation;
}

#msg-btn span:not(.dot) {
  display: none;
}

#nav {
  right: 5px;
  gap: 8px;
}

#nav button {
  width: 7px;
  height: 7px;
  padding: 6px;
  background-clip: content-box;
  touch-action: manipulation;
}

#compose-btn,
#library-btn {
  bottom: calc(12px + env(safe-area-inset-bottom));
  width: 48px;
  height: 48px;
}

#compose-btn {
  left: calc(10px + env(safe-area-inset-left));
  font-size: 23px;
}

#library-btn {
  right: calc(10px + env(safe-area-inset-right));
  font-size: 17px;
}

.hint {
  bottom: calc(8px + env(safe-area-inset-bottom));
  font-size: 9px;
}

/* Fenêtres modales adaptées aux écrans étroits */
.overlay {
  padding:
    calc(10px + env(safe-area-inset-top))
    max(10px, env(safe-area-inset-right))
    calc(10px + env(safe-area-inset-bottom))
    max(10px, env(safe-area-inset-left));
  align-items: flex-end;
}

.modal-panel,
.wide-panel {
  width: 100%;
  max-width: 100%;
  max-height: min(90dvh, 760px);
  border-radius: 14px 14px 8px 8px;
}

.modal-head {
  padding: 14px 15px 11px;
}

.modal-body {
  padding: 14px 15px 16px;
  max-height: calc(90dvh - 58px);
  -webkit-overflow-scrolling: touch;
}

.modal-close,
.btn,
.tb-btn,
.mode-btn,
.file-btn,
.filter-chip,
.folder-chip,
.folder-add,
.library-star,
.library-delete {
  min-height: 40px;
  touch-action: manipulation;
}

.library-tools {
  grid-template-columns: 1fr;
}

#library-search,
.select-field,
#add-contact,
#thread-input,
#compose-caption {
  font-size: 16px; /* évite le zoom automatique sur iOS */
}

#library-results {
  max-height: 52dvh;
}

#thread-messages {
  max-height: 42dvh;
}

#thread-input-row {
  padding-bottom: 2px;
}

.post-tools {
  opacity: 1;
  pointer-events: auto;
}

.delete-btn,
.post-tool-btn {
  width: 40px;
  height: 40px;
}

/* Écrans très petits */
@media (max-width: 380px) {
  section.card-slot {
    padding-left: 9px;
    padding-right: 9px;
  }

  .card {
    padding-left: 16px;
    padding-right: 16px;
  }

  .card-tag {
    margin-left: 18px;
  }

  p.lead {
    font-size: 15px;
  }

  .diagram-caption {
    font-size: 11px;
  }

  .sources li {
    font-size: 9.5px;
  }
}

/* Paysage : conserver une fiche lisible sans la couper */
@media (orientation: landscape) and (max-height: 520px) {
  section.card-slot {
    padding-top: 42px;
    padding-bottom: 58px;
  }

  .card {
    padding-top: 24px;
    padding-bottom: 54px;
  }

  .card-body {
    overflow-y: auto;
  }

  .diagram-wrap svg {
    max-height: 54vh;
  }

  #compose-btn,
  #library-btn {
    width: 42px;
    height: 42px;
  }
}

/* Respect du mode d'accessibilité "réduire les animations" */
@media (prefers-reduced-motion: reduce) {
  .flip-container,
  .card-inner,
  .ctrl-btn,
  #msg-btn,
  #compose-btn,
  #library-btn {
    transition: none !important;
  }

  #feed {
    scroll-behavior: auto !important;
  }
}

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
<button id="library-btn" aria-label="Ouvrir la bibliothèque">⌕</button>

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
                <circle cx="60" cy="50" r="26" stroke="#A8B58A" stroke-width="2.5"/>
                <g stroke="#A8B58A" stroke-width="2.5">
                  <line x1="60" y1="10" x2="60" y2="0"/>
                  <line x1="60" y1="100" x2="60" y2="90"/>
                  <line x1="20" y1="50" x2="10" y2="50"/>
                  <line x1="30" y1="20" x2="23" y2="13"/>
                  <line x1="90" y1="20" x2="97" y2="13"/>
                </g>
                <path d="M180 190 C130 190 110 150 140 110 C160 130 200 130 200 90 C230 130 240 170 200 200 C215 220 200 245 180 245 C160 245 145 220 160 200 Z" fill="#F7C8D3" stroke="#2D3A47" stroke-width="2"/>
                <line x1="180" y1="245" x2="180" y2="270" stroke="#2D3A47" stroke-width="3"/>
                <path d="M90 60 L150 130" stroke="#A8B58A" stroke-width="2" marker-end="url(#arrow)"/>
                <g font-family="IBM Plex Mono" font-size="11" fill="#59636d">
                  <text x="215" y="70">CO₂</text>
                  <line x1="255" y1="66" x2="220" y2="130" stroke="#A9B7C6" stroke-width="1.6" marker-end="url(#arrowt)"/>
                  <text x="20" y="220">H₂O</text>
                  <line x1="45" y1="215" x2="140" y2="215" stroke="#A9B7C6" stroke-width="1.6" marker-end="url(#arrowt)"/>
                  <text x="270" y="150">O₂</text>
                  <line x1="230" y1="140" x2="265" y2="148" stroke="#A9B7C6" stroke-width="1.6"/>
                  <text x="270" y="200">glucose</text>
                  <line x1="220" y1="190" x2="265" y2="198" stroke="#A9B7C6" stroke-width="1.6"/>
                </g>
                <defs>
                  <marker id="arrow" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="#A8B58A"/></marker>
                  <marker id="arrowt" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="#A9B7C6"/></marker>
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
                <circle cx="180" cy="150" r="14" fill="#F7C8D3" stroke="#2D3A47" stroke-width="1.5"/>
                <circle cx="176" cy="146" r="4.5" fill="#A8B58A"/>
                <circle cx="185" cy="152" r="4.5" fill="#A9B7C6"/>
                <circle cx="178" cy="156" r="4.5" fill="#A8B58A"/>
                <ellipse cx="180" cy="150" rx="110" ry="42" stroke="#59636d" stroke-width="1.2"/>
                <ellipse cx="180" cy="150" rx="110" ry="42" stroke="#59636d" stroke-width="1.2" transform="rotate(60 180 150)"/>
                <ellipse cx="180" cy="150" rx="110" ry="42" stroke="#59636d" stroke-width="1.2" transform="rotate(120 180 150)"/>
                <circle cx="290" cy="150" r="5" fill="#A9B7C6"/>
                <circle cx="120" cy="65" r="5" fill="#A9B7C6"/>
                <circle cx="128" cy="228" r="5" fill="#A9B7C6"/>
                <g font-family="IBM Plex Mono" font-size="10.5" fill="#59636d">
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
                <path d="M20 230 Q180 260 340 230 L340 260 L20 260 Z" fill="#A9B7C6" opacity="0.25"/>
                <path d="M20 230 Q180 260 340 230" stroke="#A9B7C6" stroke-width="2"/>
                <ellipse cx="120" cy="70" rx="42" ry="20" fill="#F7C8D3" stroke="#2D3A47" stroke-width="1.5"/>
                <ellipse cx="150" cy="60" rx="30" ry="16" fill="#F7C8D3" stroke="#2D3A47" stroke-width="1.5"/>
                <path d="M80 130 Q90 170 100 130" stroke="#A9B7C6" stroke-width="2" fill="none" marker-end="url(#arrowt2)"/>
                <path d="M120 130 Q130 175 140 130" stroke="#A9B7C6" stroke-width="2" fill="none" marker-end="url(#arrowt2)"/>
                <path d="M160 130 Q170 170 180 130" stroke="#A9B7C6" stroke-width="2" fill="none" marker-end="url(#arrowt2)"/>
                <path d="M80 210 C60 170 60 120 90 90" stroke="#A8B58A" stroke-width="2" fill="none" marker-end="url(#arrowg)"/>
                <path d="M240 90 C270 130 260 190 220 218" stroke="#2D3A47" stroke-width="1.8" fill="none" marker-end="url(#arrowi)"/>
                <g font-family="IBM Plex Mono" font-size="10.5" fill="#59636d">
                  <text x="20" y="150">évaporation</text>
                  <text x="250" y="150">précipitations</text>
                  <text x="90" y="245">océan</text>
                </g>
                <defs>
                  <marker id="arrowt2" markerWidth="7" markerHeight="7" refX="3.5" refY="3.5" orient="auto"><path d="M0,0 L7,3.5 L0,7 Z" fill="#A9B7C6"/></marker>
                  <marker id="arrowg" markerWidth="7" markerHeight="7" refX="3.5" refY="3.5" orient="auto"><path d="M0,0 L7,3.5 L0,7 Z" fill="#A8B58A"/></marker>
                  <marker id="arrowi" markerWidth="7" markerHeight="7" refX="3.5" refY="3.5" orient="auto"><path d="M0,0 L7,3.5 L0,7 Z" fill="#2D3A47"/></marker>
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
        <div class="compose-type-wrap">
          <span class="field-label">Type de fiche</span>
          <select id="compose-type" class="select-field">
            <option value="Concept">Concept</option>
            <option value="Schéma">Schéma</option>
            <option value="Définition">Définition</option>
            <option value="Question">Question</option>
            <option value="Résumé de livre">Résumé de livre</option>
            <option value="Citation">Citation</option>
            <option value="Note">Note libre</option>
          </select>
          <div class="compose-type-help">Le type donne un cadre visuel, mais le contenu reste libre.</div>
          <div class="schema-builder" id="schema-builder">
            <span class="field-label">Construire le schéma</span>
            <div class="schema-grid">
              <div class="schema-node"><span>1</span><input id="schema-node-1" placeholder="Idée / élément de départ"></div>
              <div class="schema-arrow">↓</div>
              <div class="schema-node"><span>2</span><input id="schema-node-2" placeholder="Relation / transformation"></div>
              <div class="schema-arrow">↓</div>
              <div class="schema-node"><span>3</span><input id="schema-node-3" placeholder="Résultat / idée finale"></div>
            </div>
            <div class="schema-note">Le schéma reste personnalisable : tu peux laisser un bloc vide.</div>
          </div>
        </div>
        <span class="field-label">Titre</span>
        <input type="text" id="compose-title" placeholder="Le titre de votre fiche" style="width:100%; font-family:'Times New Roman', Times, serif; font-size:19px; padding:8px 10px; border:1px solid var(--rule); border-radius:4px; margin-bottom:14px; background:#ffffff40; color:var(--ink);">

        <span class="field-label">Texte</span>
        <div class="text-toolbar">
          <button type="button" class="tb-btn" data-action="bold" title="Gras"><strong>G</strong></button>
          <button type="button" class="tb-btn" data-action="italic" title="Italique"><em>I</em></button>
          <button type="button" class="tb-btn" data-action="highlight" title="Surligner">Surligner</button>
          <button type="button" class="tb-btn" data-action="newline" title="Aller à la ligne">↵ Ligne</button>
          <button type="button" class="tb-btn" data-action="space" title="Espacement">␣ Espace</button>
        </div>
        <textarea id="compose-text" placeholder="Votre idée, expliquée en quelques phrases…" style="min-height:140px;"></textarea>

        <span class="field-label">Légende <span style="opacity:0.6;">(optionnel — remplace votre nom en signature)</span></span>
        <input type="text" id="compose-legend" placeholder="Vous" style="width:100%; font-family:'Montserrat', Arial, sans-serif; font-size:13px; padding:8px 10px; border:1px solid var(--rule); border-radius:4px; margin-bottom:14px; background:#ffffff40; color:var(--ink);">
        <span class="field-label">Dossier</span>
        <select id="compose-folder" class="select-field" style="margin-bottom:14px;"><option value="">Sans dossier</option></select>
      </div>

      <div class="modal-actions">
        <button class="btn" id="compose-cancel">Annuler</button>
        <button class="btn primary" id="compose-submit" disabled>Publier</button>
      </div>
    </div>
  </div>
</div>


<!-- LIBRARY / DISCOVERY OVERLAY -->
<div class="overlay" id="library-overlay">
  <div class="modal-panel wide-panel">
    <div class="modal-head">
      <h2>Bibliothèque</h2>
      <button class="modal-close" id="library-close">fermer ✕</button>
    </div>
    <div class="modal-body">
      <div class="library-tools">
        <input id="library-search" type="search" placeholder="Rechercher dans les fiches…">
        <button class="btn" id="random-card">Aléatoire</button>
      </div>
      <div class="filter-row" id="library-filters">
        <button class="filter-chip active" data-filter="all">Toutes</button>
        <button class="filter-chip" data-filter="favorites">Favoris</button>
        <button class="filter-chip" data-filter="Concept">Concepts</button>
        <button class="filter-chip" data-filter="Schéma">Schémas</button>
        <button class="filter-chip" data-filter="Résumé de livre">Livres</button>
        <button class="filter-chip" data-filter="mine">Mes fiches</button>
      </div>
      <div class="folder-bar" id="folder-bar">
        <button class="folder-chip active" data-folder="all">Tous les dossiers</button>
        <button class="folder-add" id="add-folder" title="Créer un dossier">+</button>
      </div>
      <div id="library-results"></div>
      <div class="library-footer">
        <button class="btn" id="export-data">Exporter mes données</button>
        <label class="btn" for="import-file">Importer</label>
        <input id="import-file" type="file" accept="application/json,.json">
      </div>
    </div>
  </div>
</div>
<div class="status-toast" id="status-toast"></div>

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
(() => {
  const $ = (s, r=document) => r.querySelector(s);
  const $$ = (s, r=document) => [...r.querySelectorAll(s)];
  const feed=$('#feed'), nav=$('#nav'), hint=$('#hint'), favCountEl=$('#fav-count');
  const KEYS={posts:'marges:v4:posts',favorites:'marges:v4:favorites',profile:'marges:v4:profile',messages:'marges:v4:messages',settings:'marges:v4:settings',folders:'marges:v4:folders',folderMap:'marges:v4:folderMap',deletedCards:'marges:v4:deletedCards'};
  const store={
    get(k,fallback=null){try{const v=localStorage.getItem(k);return v===null?fallback:JSON.parse(v)}catch(e){return fallback}},
    set(k,v){try{localStorage.setItem(k,JSON.stringify(v));return true}catch(e){toast('Stockage local saturé — exportez vos données.');return false}},
    del(k){localStorage.removeItem(k)}
  };
  let favorites=new Set(store.get(KEYS.favorites,[]));
  let posts=store.get(KEYS.posts,[]);
  let activeProfile=store.get(KEYS.profile,'Vous');
  let folders=store.get(KEYS.folders,[]);
  let folderMap=store.get(KEYS.folderMap,{});
  let deletedCards=new Set(store.get(KEYS.deletedCards,[]));
  let io=null, currentContact=null, composeMode='photo', pendingFront=null, pendingBack=null, editingPostId=null;
  let libraryFolder='all';

  function toast(msg){const el=$('#status-toast');el.textContent=msg;el.classList.add('show');clearTimeout(toast.t);toast.t=setTimeout(()=>el.classList.remove('show'),2200)}
  function escapeHtml(str){const d=document.createElement('div');d.textContent=str||'';return d.innerHTML}
  function formatBody(str){let safe=escapeHtml(str);safe=safe.replace(/\*\*(.+?)\*\*/gs,'<strong>$1</strong>');safe=safe.replace(/_(.+?)_/gs,'<em>$1</em>');safe=safe.replace(/==(.+?)==/gs,'<mark>$1</mark>');return safe.replace(/\n/g,'<br>')}
  function persistFavorites(){store.set(KEYS.favorites,[...favorites]);updateFavCount()}
  function updateFavCount(){favCountEl.textContent=favorites.size}
  function saveFolders(){store.set(KEYS.folders,folders);store.set(KEYS.folderMap,folderMap)}
  function renderFolderControls(){
    const bar=$('#folder-bar'); if(!bar)return;
    bar.querySelectorAll('.folder-chip').forEach(x=>x.remove());
    const all=document.createElement('button'); all.className='folder-chip '+(libraryFolder==='all'?'active':''); all.textContent='Tous les dossiers'; all.onclick=()=>{libraryFolder='all';renderFolderControls();renderLibrary()};
    bar.insertBefore(all,$('#add-folder'));
    folders.forEach(f=>{const b=document.createElement('button');b.className='folder-chip '+(libraryFolder===f.id?'active':'');b.textContent=f.name;b.onclick=()=>{libraryFolder=f.id;renderFolderControls();renderLibrary()};bar.insertBefore(b,$('#add-folder'))});
  }
  function populateComposeFolders(selected=''){const sel=$('#compose-folder');if(!sel)return;sel.innerHTML='<option value="">Sans dossier</option>'+folders.map(f=>`<option value="${escapeHtml(f.id)}">${escapeHtml(f.name)}</option>`).join('');sel.value=selected||''}
  $('#add-folder')?.addEventListener('click',()=>{const name=prompt('Nom du nouveau dossier :');if(name&&name.trim()){folders.push({id:'folder-'+Date.now(),name:name.trim()});saveFolders();renderFolderControls();populateComposeFolders();toast('Dossier créé')}});

  function identifyStaticCards(){
    $$('.card-slot').forEach((slot,i)=>{
      if(slot.dataset.cardId) return;
      const btn=$('.like-btn',slot);
      if(btn) slot.dataset.cardId=btn.dataset.id;
      else slot.dataset.cardId='static-'+i;
      const tag=$('.card-tag',slot)?.textContent.trim() || (i===0?'Introduction':'Note');
      slot.dataset.cardType=tag;
      slot.dataset.owner='system';
      const title=$('.title',slot)?.textContent.trim() || (i===0?'Marges':'Fiche');
      slot.dataset.cardTitle=title;
    });
    $$('.card-slot').forEach(slot=>{
      const id=slot.dataset.cardId;
      if(!id) return;
      if(deletedCards.has(id)) slot.classList.add('deleted-card');
      if(!slot.querySelector('.static-delete-btn')){
        const tools=document.createElement('div');
        tools.className='post-tools static-tools';
        tools.innerHTML='<button class="post-tool-btn static-delete-btn" title="Supprimer cette fiche" aria-label="Supprimer cette fiche">⌫</button>';
        slot.querySelector('.flip-container')?.appendChild(tools);
        tools.querySelector('.static-delete-btn').addEventListener('click',e=>{
          e.stopPropagation();
          if(!confirm('Supprimer cette fiche ?')) return;
          deletedCards.add(id);
          favorites.delete(id);
          delete folderMap[id];
          store.set(KEYS.deletedCards,[...deletedCards]);
          saveFolders();
          slot.remove();
          persistFavorites();
          renderFolderControls();
          renderLibrary();
          rebuildFeedControls();
          toast('Fiche supprimée');
        });
      }
    });
  }

  function rebuildFeedControls(){
    const slots=$$('.card-slot:not(.hidden-by-filter):not(.deleted-card)');nav.innerHTML='';
    slots.forEach(slot=>{const b=document.createElement('button');b.addEventListener('click',()=>slot.scrollIntoView({behavior:'smooth'}));nav.appendChild(b)});
    const dots=$$('button',nav); if(io)io.disconnect();
    io=new IntersectionObserver(entries=>entries.forEach(entry=>{const idx=slots.indexOf(entry.target);if(entry.isIntersecting){entry.target.classList.add('in-view');dots.forEach(d=>d.classList.remove('active'));if(dots[idx])dots[idx].classList.add('active');if(idx>0)hint.style.opacity='0'}else entry.target.classList.remove('in-view')}),{threshold:.6});
    slots.forEach(s=>io.observe(s));
  }

  document.addEventListener('click',e=>{
    const flip=e.target.closest('.flip-btn'); if(flip){const inner=document.getElementById(flip.dataset.target);if(inner)inner.classList.toggle('flipped')}
    const like=e.target.closest('.like-btn'); if(like){const id=like.dataset.id; if(favorites.has(id))favorites.delete(id);else favorites.add(id);like.classList.toggle('liked',favorites.has(id));persistFavorites();renderLibrary()}
  });
  function syncLikeButtons(){$$('.like-btn').forEach(b=>b.classList.toggle('liked',favorites.has(b.dataset.id)));updateFavCount()}

  // Compose
  const composeOverlay=$('#compose-overlay'), composeFileFront=$('#compose-file-front'), composeFileBack=$('#compose-file-back'), composePreviewFront=$('#compose-preview-front'), composePreviewBack=$('#compose-preview-back'), composePhotoFields=$('#compose-photo-fields'), composeTextFields=$('#compose-text-fields'), composeTitle=$('#compose-title'), composeText=$('#compose-text'), composeLegend=$('#compose-legend'), composeType=$('#compose-type'), composeFolder=$('#compose-folder'), schemaBuilder=$('#schema-builder'), schemaNode1=$('#schema-node-1'), schemaNode2=$('#schema-node-2'), schemaNode3=$('#schema-node-3'), composeSubmit=$('#compose-submit');
  function insertAtCursor(textarea,text){const s=textarea.selectionStart,e=textarea.selectionEnd,v=textarea.value;textarea.value=v.slice(0,s)+text+v.slice(e);textarea.selectionStart=textarea.selectionEnd=s+text.length;textarea.focus()}
  function wrapSelection(textarea,before,after){const s=textarea.selectionStart,e=textarea.selectionEnd,v=textarea.value,sel=v.slice(s,e)||'texte';textarea.value=v.slice(0,s)+before+sel+after+v.slice(e);textarea.selectionStart=s+before.length;textarea.selectionEnd=s+before.length+sel.length;textarea.focus()}
  $$('.tb-btn').forEach(btn=>btn.addEventListener('click',()=>{const a=btn.dataset.action;if(a==='bold')wrapSelection(composeText,'**','**');else if(a==='italic')wrapSelection(composeText,'_','_');else if(a==='highlight')wrapSelection(composeText,'==','==');else if(a==='newline')insertAtCursor(composeText,'\n');else if(a==='space')insertAtCursor(composeText,'\n\n');updateSubmitState()}));
  function updateSchemaVisibility(){schemaBuilder.classList.toggle('open',composeMode==='text'&&composeType.value==='Schéma')}
  composeType.addEventListener('change',()=>{updateSchemaVisibility();updateSubmitState()});
  [schemaNode1,schemaNode2,schemaNode3].forEach(x=>x.addEventListener('input',updateSubmitState));
  $$('.mode-btn').forEach(btn=>btn.addEventListener('click',()=>{composeMode=btn.dataset.mode;$$('.mode-btn').forEach(b=>b.classList.toggle('active',b===btn));composePhotoFields.style.display=composeMode==='photo'?'block':'none';composeTextFields.style.display=composeMode==='text'?'block':'none';updateSubmitState()}));
  function updateSubmitState(){composeSubmit.disabled=composeMode==='photo'?!pendingFront:!composeText.value.trim()}
  composeText.addEventListener('input',updateSubmitState);composeTitle.addEventListener('input',updateSubmitState);
  $('#compose-btn').addEventListener('click',()=>{editingPostId=null;composeSubmit.textContent='Publier';populateComposeFolders();updateSchemaVisibility();composeOverlay.classList.add('open')});
  $('#compose-close').addEventListener('click',closeCompose);$('#compose-cancel').addEventListener('click',closeCompose);
  function closeCompose(){composeOverlay.classList.remove('open');composeFileFront.value='';composeFileBack.value='';composePreviewFront.style.display='none';composePreviewBack.style.display='none';composeTitle.value='';composeText.value='';composeLegend.value='';composeType.value='Concept';composeFolder.value='';schemaNode1.value='';schemaNode2.value='';schemaNode3.value='';updateSchemaVisibility();pendingFront=pendingBack=null;editingPostId=null;composeSubmit.textContent='Publier';composeSubmit.disabled=true}
  function readAndResize(file,cb){const r=new FileReader();r.onload=e=>{const img=new Image();img.onload=()=>{const maxW=1100,scale=Math.min(1,maxW/img.width),c=document.createElement('canvas');c.width=Math.round(img.width*scale);c.height=Math.round(img.height*scale);c.getContext('2d').drawImage(img,0,0,c.width,c.height);cb(c.toDataURL('image/jpeg',.76))};img.src=e.target.result};r.readAsDataURL(file)}
  composeFileFront.addEventListener('change',()=>{const f=composeFileFront.files[0];if(f)readAndResize(f,d=>{pendingFront=d;composePreviewFront.src=d;composePreviewFront.style.display='block';updateSubmitState()})});
  composeFileBack.addEventListener('change',()=>{const f=composeFileBack.files[0];if(f)readAndResize(f,d=>{pendingBack=d;composePreviewBack.src=d;composePreviewBack.style.display='block'})});
  composeSubmit.addEventListener('click',()=>{
    let post;
    if(composeMode==='photo'){if(!pendingFront)return;post={id:editingPostId||'post-'+Date.now(),type:'photo',cardType:'Photo',author:activeProfile,imageFront:pendingFront,imageBack:pendingBack,folderId:composeFolder.value||'',ts:Date.now()}}
    else{const body=composeText.value.trim();if(!body)return;post={id:editingPostId||'post-'+Date.now(),type:'text',cardType:composeType.value,author:activeProfile,title:composeTitle.value.trim(),body,legend:composeLegend.value.trim(),folderId:composeFolder.value||'',schema:composeType.value==='Schéma'?[schemaNode1.value.trim(),schemaNode2.value.trim(),schemaNode3.value.trim()]:null,ts:Date.now()}}
    if(editingPostId){posts=posts.map(p=>p.id===editingPostId?{...p,...post}:p)}else posts.unshift(post);
    if(!store.set(KEYS.posts,posts))return; if(post.folderId)folderMap[post.id]=post.folderId;else delete folderMap[post.id];saveFolders(); renderAllPosts(); closeCompose(); toast(editingPostId?'Fiche modifiée':'Fiche enregistrée sur cet appareil');
  });

  function renderAllPosts(){$$('.card-slot[data-user-post="1"]').forEach(x=>x.remove());posts.slice().reverse().forEach(renderPost);identifyStaticCards();syncLikeButtons();rebuildFeedControls();renderLibrary()}
  const anchor=$('#user-posts-anchor');
  function renderPost(post){
    if(!post.imageFront&&post.image)post.imageFront=post.image;
    const innerId='inner-'+post.id,section=document.createElement('section');section.className='card-slot';section.dataset.userPost='1';section.dataset.cardId=post.id;section.dataset.cardType=post.cardType||(post.type==='photo'?'Photo':'Note');section.dataset.cardTitle=post.title||post.cardType||'Publication';section.dataset.owner=post.author||'Vous';
    let cardHtml='';
    if(post.type==='text'){
      const schema=Array.isArray(post.schema)?post.schema.filter(Boolean):[];
      const schemaHtml=post.cardType==='Schéma'&&schema.length ? '<div class="schema-card">'+schema.map((n,i)=>(i?'<div class="schema-card-arrow">↓</div>':'')+'<div class="schema-card-node">'+escapeHtml(n)+'</div>').join('')+'</div>' : '';
      cardHtml=`<div class="card-inner" id="${innerId}"><div class="card"><div class="card-index">Post</div><div class="card-tag gold">${escapeHtml(post.cardType||'Publication')}</div><div class="card-body">${post.title?`<h1 class="title" style="font-size:24px;">${escapeHtml(post.title)}</h1>`:''}<p class="lead">${formatBody(post.body)}</p>${schemaHtml}<p class="example post-legend" style="margin-top:auto;">${escapeHtml(post.legend||post.author)}</p></div></div></div>`;
    }
    else{const hb=!!post.imageBack;cardHtml=`<div class="card-inner" id="${innerId}"><div class="card photo front"><div class="card-body"><img class="post-photo" src="${post.imageFront}" alt=""></div></div>${hb?`<div class="card photo back"><div class="card-body"><img class="post-photo" src="${post.imageBack}" alt=""></div></div>`:''}</div>`}
    const hb=post.type==='photo'&&!!post.imageBack;
    section.innerHTML=`<div class="flip-container">${cardHtml}<div class="post-tools"><button class="post-tool-btn edit-post" title="Modifier">✎</button><button class="delete-btn" title="Supprimer"><svg viewBox="0 0 20 20"><path d="M4 5h12 M8 5V3h4v2 M6 5l1 12h6l1-12"/></svg></button></div><div class="card-controls"><button class="ctrl-btn like-btn" data-id="${post.id}" aria-label="Garder cette fiche"><svg viewBox="0 0 20 18"><path d="M10 17 C2 11 1 5 5.5 2.5 C8 1 10 2.5 10 5 C10 2.5 12 1 14.5 2.5 C19 5 18 11 10 17 Z"/></svg></button>${hb?`<button class="ctrl-btn flip-btn" data-target="${innerId}" aria-label="Retourner la fiche"><svg viewBox="0 0 20 20"><path d="M17 10a7 7 0 1 1-2-4.9M17 3v4h-4"/></svg></button>`:''}</div></div>`;
    $('.delete-btn',section).addEventListener('click',()=>{if(confirm('Supprimer cette fiche ?')){posts=posts.filter(p=>p.id!==post.id);favorites.delete(post.id);delete folderMap[post.id];if(!store.set(KEYS.posts,posts))return;saveFolders();persistFavorites();section.remove();rebuildFeedControls();renderLibrary();toast('Fiche supprimée')}});
    $('.edit-post',section).addEventListener('click',()=>editPost(post));anchor.after(section);
  }
  function editPost(post){editingPostId=post.id;composeOverlay.classList.add('open');composeSubmit.textContent='Enregistrer';if(post.type==='text'){composeMode='text';$$('.mode-btn').forEach(b=>b.classList.toggle('active',b.dataset.mode==='text'));composePhotoFields.style.display='none';composeTextFields.style.display='block';composeType.value=post.cardType||'Concept';composeTitle.value=post.title||'';composeText.value=post.body||'';composeLegend.value=post.legend||'';populateComposeFolders(post.folderId||folderMap[post.id]||'');const sc=Array.isArray(post.schema)?post.schema:[];schemaNode1.value=sc[0]||'';schemaNode2.value=sc[1]||'';schemaNode3.value=sc[2]||'';updateSchemaVisibility()}else{composeMode='photo';$$('.mode-btn').forEach(b=>b.classList.toggle('active',b.dataset.mode==='photo'));composePhotoFields.style.display='block';composeTextFields.style.display='none';pendingFront=post.imageFront;pendingBack=post.imageBack||null;composePreviewFront.src=pendingFront;composePreviewFront.style.display='block';if(pendingBack){composePreviewBack.src=pendingBack;composePreviewBack.style.display='block'}}updateSubmitState()}

  // Library / discovery
  const libraryOverlay=$('#library-overlay'), librarySearch=$('#library-search'), libraryResults=$('#library-results'); let libraryFilter='all';
  $('#library-btn').addEventListener('click',()=>{libraryOverlay.classList.add('open');renderLibrary();setTimeout(()=>librarySearch.focus(),80)});$('#library-close').addEventListener('click',()=>libraryOverlay.classList.remove('open'));
  $$('#library-filters .filter-chip').forEach(btn=>btn.addEventListener('click',()=>{libraryFilter=btn.dataset.filter;$$('#library-filters .filter-chip').forEach(b=>b.classList.toggle('active',b===btn));renderLibrary()}));librarySearch.addEventListener('input',renderLibrary);
  function cardMeta(slot){return{id:slot.dataset.cardId||'',type:slot.dataset.cardType||'Note',title:slot.dataset.cardTitle||$('.title',slot)?.textContent.trim()||'Fiche',owner:slot.dataset.owner||'system',folderId:folderMap[slot.dataset.cardId]||'',text:slot.innerText.replace(/\s+/g,' ').trim(),slot}}
  function renderLibrary(){
    identifyStaticCards(); renderFolderControls();
    const q=librarySearch.value.trim().toLowerCase();
    const items=$$('.card-slot').map(cardMeta).filter(x=>{
      if(deletedCards.has(x.id))return false;
      if(libraryFilter==='favorites'&&!favorites.has(x.id))return false;
      if(libraryFilter==='mine'&&x.owner!==activeProfile)return false;
      if(!['all','favorites','mine'].includes(libraryFilter)&&x.type!==libraryFilter)return false;
      if(libraryFolder!=='all'&&x.folderId!==libraryFolder)return false;
      return !q||(`${x.title} ${x.type} ${x.text}`).toLowerCase().includes(q);
    });
    libraryResults.innerHTML='';
    if(!items.length){libraryResults.innerHTML='<p class="empty-note">Aucune fiche ne correspond à cette recherche.</p>';return}
    items.forEach(x=>{
      const d=document.createElement('div'); d.className='library-item';
      d.innerHTML=`<div class="library-item-top"><div class="library-item-title">${escapeHtml(x.title)}</div><div class="library-item-type">${escapeHtml(x.type)}</div></div><div class="library-item-excerpt">${escapeHtml(x.text.slice(0,150))}${x.text.length>150?'…':''}</div><div class="library-item-actions"><select class="library-folder-select"><option value="">Sans dossier</option>${folders.map(f=>`<option value="${escapeHtml(f.id)}">${escapeHtml(f.name)}</option>`).join('')}</select><button class="library-star" title="Favori">${favorites.has(x.id)?'♥':'♡'}</button><button class="library-delete" title="Supprimer" aria-label="Supprimer">⌫</button></div>`;
      const sel=$('.library-folder-select',d); sel.value=x.folderId||'';
      sel.addEventListener('change',e=>{if(e.target.value)folderMap[x.id]=e.target.value;else delete folderMap[x.id];saveFolders();renderLibrary();});
      $('.library-star',d).addEventListener('click',e=>{e.stopPropagation();if(favorites.has(x.id))favorites.delete(x.id);else favorites.add(x.id);persistFavorites();renderLibrary();syncLikeButtons()});
      $('.library-delete',d).addEventListener('click',e=>{
        e.stopPropagation();
        if(!confirm('Supprimer cette fiche ?')) return;
        if(x.owner==='system'){
          deletedCards.add(x.id);
          store.set(KEYS.deletedCards,[...deletedCards]);
        }else{
          posts=posts.filter(p=>p.id!==x.id);
          store.set(KEYS.posts,posts);
        }
        favorites.delete(x.id);
        delete folderMap[x.id];
        saveFolders();
        persistFavorites();
        if(x.slot) x.slot.classList.add('deleted-card');
        renderAllPosts();
        toast('Fiche supprimée');
      });
      d.addEventListener('click',e=>{if(e.target.closest('select')||e.target.closest('button'))return;libraryOverlay.classList.remove('open');x.slot.scrollIntoView({behavior:'smooth'})});
      libraryResults.appendChild(d);
    });
  }
  $('#random-card').addEventListener('click',()=>{const slots=$$('.card-slot').filter(s=>!s.classList.contains('hidden-by-filter'));if(!slots.length)return;libraryOverlay.classList.remove('open');slots[Math.floor(Math.random()*slots.length)].scrollIntoView({behavior:'smooth'})});
  $('#fav-counter').style.cursor='pointer';$('#fav-counter').addEventListener('click',()=>{libraryFilter='favorites';$$('#library-filters .filter-chip').forEach(b=>b.classList.toggle('active',b.dataset.filter==='favorites'));libraryOverlay.classList.add('open');renderLibrary()});

  // Export / import
  $('#export-data').addEventListener('click',()=>{const payload={app:'Marges',version:4,exportedAt:new Date().toISOString(),posts,favorites:[...favorites],profile:activeProfile,messages:store.get(KEYS.messages,[]),settings:store.get(KEYS.settings,{}),folders,folderMap,deletedCards:[...deletedCards]};const blob=new Blob([JSON.stringify(payload,null,2)],{type:'application/json'}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download='marges-sauvegarde-'+new Date().toISOString().slice(0,10)+'.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);toast('Sauvegarde exportée')});
  $('#import-file').addEventListener('change',e=>{const f=e.target.files[0];if(!f)return;const r=new FileReader();r.onload=()=>{try{const d=JSON.parse(r.result);if(d.app!=='Marges')throw 0;posts=Array.isArray(d.posts)?d.posts:[];favorites=new Set(Array.isArray(d.favorites)?d.favorites:[]);activeProfile=d.profile||'Vous';store.set(KEYS.posts,posts);persistFavorites();store.set(KEYS.profile,activeProfile);if(Array.isArray(d.messages))store.set(KEYS.messages,d.messages);if(d.settings)store.set(KEYS.settings,d.settings);folders=Array.isArray(d.folders)?d.folders:[];folderMap=d.folderMap&&typeof d.folderMap==='object'?d.folderMap:{};deletedCards=new Set(Array.isArray(d.deletedCards)?d.deletedCards:[]);store.set(KEYS.deletedCards,[...deletedCards]);saveFolders();$('#profile-name').textContent=activeProfile;renderAllPosts();renderFolderControls();renderLibrary();toast('Données importées')}catch(err){alert('Ce fichier ne semble pas être une sauvegarde Marges valide.')}};r.readAsText(f);e.target.value=''});

  // Profile + messages
  const profileNameEl=$('#profile-name');profileNameEl.textContent=activeProfile;$('#change-profile').addEventListener('click',()=>{const name=prompt('Nom du profil :',activeProfile);if(name&&name.trim()){activeProfile=name.trim();store.set(KEYS.profile,activeProfile);profileNameEl.textContent=activeProfile;renderContactList()}});
  const msgBtn=$('#msg-btn'),messagesOverlay=$('#messages-overlay'),listView=$('#list-view'),threadView=$('#thread-view'),contactListEl=$('#contact-list'),noContactsEl=$('#no-contacts'),addContactInput=$('#add-contact'),threadMessagesEl=$('#thread-messages'),threadInput=$('#thread-input');
  msgBtn.addEventListener('click',()=>{messagesOverlay.classList.add('open');showList();renderContactList()});$('#messages-close').addEventListener('click',()=>messagesOverlay.classList.remove('open'));function showList(){listView.style.display='block';threadView.classList.remove('active')}function showThread(){listView.style.display='none';threadView.classList.add('active')}$('#thread-back').addEventListener('click',showList);
  function getAllMessages(){return store.get(KEYS.messages,[])}function saveAllMessages(m){store.set(KEYS.messages,m)}
  function renderContactList(){const msgs=getAllMessages(),partners=new Set();msgs.forEach(m=>{if(m.from===activeProfile)partners.add(m.to);if(m.to===activeProfile)partners.add(m.from)});contactListEl.innerHTML='';noContactsEl.style.display=partners.size?'none':'block';[...partners].forEach(name=>{const li=document.createElement('li');li.textContent=name;li.addEventListener('click',()=>openThread(name));contactListEl.appendChild(li)})}
  addContactInput.addEventListener('keydown',e=>{if(e.key==='Enter'&&addContactInput.value.trim()){const n=addContactInput.value.trim();addContactInput.value='';if(n!==activeProfile)openThread(n)}});function openThread(name){currentContact=name;showThread();renderThreadMessages()}function renderThreadMessages(){const thread=getAllMessages().filter(m=>(m.from===activeProfile&&m.to===currentContact)||(m.from===currentContact&&m.to===activeProfile)).sort((a,b)=>a.ts-b.ts);threadMessagesEl.innerHTML=thread.length?'':'<p class="empty-note">Aucun message pour l\'instant.</p>';thread.forEach(m=>{const d=document.createElement('div');d.className='msg-bubble '+(m.from===activeProfile?'mine':'theirs');d.innerHTML=escapeHtml(m.text)+`<div class="msg-meta">${escapeHtml(m.from)}</div>`;threadMessagesEl.appendChild(d)});threadMessagesEl.scrollTop=threadMessagesEl.scrollHeight}function sendMessage(){const text=threadInput.value.trim();if(!text||!currentContact)return;threadInput.value='';const m=getAllMessages();m.push({from:activeProfile,to:currentContact,text,ts:Date.now()});saveAllMessages(m);renderThreadMessages()}$('#thread-send').addEventListener('click',sendMessage);threadInput.addEventListener('keydown',e=>{if(e.key==='Enter')sendMessage()});

  // Overlay usability
  $$('.overlay').forEach(o=>o.addEventListener('click',e=>{if(e.target===o)o.classList.remove('open')}));document.addEventListener('keydown',e=>{if(e.key==='Escape')$$('.overlay.open').forEach(o=>o.classList.remove('open'))});

  // migrate the old browser-local format if present
  function boot(){identifyStaticCards();renderFolderControls();populateComposeFolders();renderAllPosts();syncLikeButtons();rebuildFeedControls();renderLibrary()}
  boot();
})();
</script>

</body>
</html>
