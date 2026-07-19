const { useState, useEffect } = React;

const phases = [
  {
    id:0, months:"3月〜4月", label:"フェーズ1", name:"距離延長", icon:"📏",
    color:"#16a34a", bg:"#f0fdf4", border:"#bbf7d0",
    goal:"15km→20kmへ距離を伸ばす", targetPace:"6:00〜6:30/km",
    desc:"今の6:00ペースを保ちながら距離だけ延ばす。急ぎすぎない。",
    sessions:[
      {week:"3月1週",month:"3月",run:"15km @ 6:10/km",note:"現状確認。余裕を感じながら走る"},
      {week:"3月2週",month:"3月",run:"16km @ 6:15/km",note:"1km延長。後半は会話できるペースでOK"},
      {week:"3月3週",month:"3月",run:"17km @ 6:15/km",note:"コースに坂を1ヶ所入れてみる"},
      {week:"3月4週",month:"3月",run:"15km @ 6:00/km",note:"回復週。距離を戻してスピード確認"},
      {week:"4月1週",month:"4月",run:"18km @ 6:20/km",note:"距離を意識。ペースは落としていい"},
      {week:"4月2週",month:"4月",run:"19km @ 6:20/km",note:"後半10kmのペース感覚をつかむ"},
      {week:"4月3週",month:"4月",run:"20km @ 6:20/km",note:"🎯 初の20km達成！"},
      {week:"4月4週",month:"4月",run:"16km @ 6:00/km",note:"回復週。気持ちよく走る"},
    ],
    milestone:"20km完走",
    tips:["距離を伸ばすときはペースを落としていい","終盤に足が残るか意識する","走後ストレッチ10分を習慣に"],
  },
  {
    id:1, months:"5月〜6月", label:"フェーズ2", name:"ペース強化", icon:"⚡",
    color:"#ea580c", bg:"#fff7ed", border:"#fed7aa",
    goal:"6:22/kmペースに体を慣らす", targetPace:"6:00〜6:22/km",
    desc:"距離20〜25kmをキープしつつ、後半にレースペースを混ぜる。",
    sessions:[
      {week:"5月1週",month:"5月",run:"20km 前半@6:30+後半@6:10",note:"ビルドアップ走。前半楽に入る"},
      {week:"5月2週",month:"5月",run:"22km @ 6:20/km",note:"サブ4:30ペースで22km"},
      {week:"5月3週",month:"5月",run:"20km 後半5km@5:55",note:"ラスト5kmだけスピードアップ"},
      {week:"5月4週",month:"5月",run:"16km @ 6:00/km",note:"回復週"},
      {week:"6月1週",month:"6月",run:"23km @ 6:20/km",note:"ペースを保てるか確認"},
      {week:"6月2週",month:"6月",run:"25km @ 6:25/km",note:"🎯 25km完走！"},
      {week:"6月3週",month:"6月",run:"20km 後半8km@6:00",note:"ビルドアップ強化"},
      {week:"6月4週",month:"6月",run:"16km @ 6:10/km",note:"回復週。疲労をリセット"},
    ],
    milestone:"25km @ 6:25/km 完走",
    tips:["沖縄6月は暑い。早朝5〜7時推奨","ビルドアップ走はレースに直結","水分・塩分補給の習慣をつける"],
  },
  {
    id:2, months:"7月〜8月", label:"フェーズ3", name:"夏の維持走", icon:"☀️",
    color:"#dc2626", bg:"#fef2f2", border:"#fecaca",
    goal:"暑さに負けず走力を維持する", targetPace:"6:30〜7:00/km（無理しない）",
    desc:"藤沢の夏は猛暑日連続。夕方17〜19時スタートで気温がやや落ち着く。ただし湿度が高いため無理は禁物。距離より継続が最優先。",
    sessions:[
      {week:"7月1週",month:"7月",run:"15km @ 6:30/km",note:"⚠️ 夕方17〜19時スタート推奨。無理せずゆっくり"},
      {week:"7月2週",month:"7月",run:"18km @ 6:40/km",note:"⚠️ 夕方スタート。水分2本持参・塩タブ必携"},
      {week:"7月3週",month:"7月",run:"15km @ 6:30/km",note:"⚠️ 猛暑日は10kmに短縮してOK。湿度に注意"},
      {week:"7月4週",month:"7月",run:"20km @ 6:40/km",note:"⚠️ 夕方スタート。塩タブ・ライト持参"},
      {week:"8月1週",month:"8月",run:"15km @ 6:30/km",note:"⚠️ 夕方でも暑さ続く。無理禁止"},
      {week:"8月2週",month:"8月",run:"18km @ 6:40/km",note:"⚠️ 夕方スタート。ジム(トレッドミル)でもOK"},
      {week:"8月3週",month:"8月",run:"15km @ 6:30/km",note:"⚠️ 熱帯夜が続く時期。体調優先で休養もOK"},
      {week:"8月4週",month:"8月",run:"20km @ 6:30/km",note:"⚠️ 夕方スタート。9月のロング走に向けて温存"},
    ],
    milestone:"夏を乗り越えて走力を維持",
    tips:["夕方17〜19時スタートで気温がやや落ち着く","日没後は暗くなるのでライト・反射材を着用","湿度が高いので体感温度は真夏並み。無理しない","水分は15〜20分ごと・塩タブ必携","危険レベルの日はジムや休養に切り替える"],
  },
  {
    id:3, months:"9月〜10月", label:"フェーズ4", name:"ロング走積み上げ", icon:"🏔",
    color:"#2563eb", bg:"#eff6ff", border:"#bfdbfe",
    goal:"30〜35kmの長距離に慣れる", targetPace:"6:20〜6:40/km",
    desc:"気温が落ち着いたら一気に距離を伸ばす。このフェーズが本番への最重要期間。",
    sessions:[
      {week:"9月1週",month:"9月",run:"22km @ 6:20/km",note:"夏明け最初のロング。身体を慣らす"},
      {week:"9月2週",month:"9月",run:"25km @ 6:20/km",note:"距離を戻す。ペースより完走優先"},
      {week:"9月3週",month:"9月",run:"28km @ 6:30/km",note:"🎯 28km復活！夏の成果を確認"},
      {week:"9月4週",month:"9月",run:"22km @ 6:10/km",note:"回復週。ビルドアップで後半上げる"},
      {week:"10月1週",month:"10月",run:"30km @ 6:30/km",note:"🎯 初の30km！完走が目標"},
      {week:"10月2週",month:"10月",run:"25km 後半10km@6:10",note:"後半上げ練習。レースペースを意識"},
      {week:"10月3週",month:"10月",run:"32km @ 6:30/km",note:"🎯 本番に近い距離。メンタルを鍛える"},
      {week:"10月4週",month:"10月",run:"20km @ 6:10/km",note:"回復週。脚の状態を整える"},
    ],
    milestone:"32km完走",
    tips:["9月上旬はまだ暑い。引き続き早朝推奨","9月のハーフ大会出場でモチベUP","補給ジェルを25km・30kmで練習","10月は走りやすい季節。距離を一気に伸ばす"],
  },
  {
    id:4, months:"11月", label:"フェーズ5", name:"レース仕上げ", icon:"🎯",
    color:"#9333ea", bg:"#faf5ff", border:"#e9d5ff",
    goal:"レースペースで走り切る感覚をつかむ", targetPace:"6:00〜6:22/km",
    desc:"距離は少し落として質を上げる。本番シミュレーションを繰り返す。",
    sessions:[
      {week:"11月1週",month:"11月",run:"35km @ 6:30/km",note:"🎯 最長ロング走！完走できれば本番余裕"},
      {week:"11月2週",month:"11月",run:"25km @ 6:20/km",note:"本番ペースで25km。余裕度を確認"},
      {week:"11月3週",month:"11月",run:"20km @ 6:10/km",note:"テーパー開始。距離を落とし始める"},
      {week:"11月4週",month:"11月",run:"15km @ 6:00/km",note:"テーパー。脚を温存する"},
    ],
    milestone:"35km完走・本番ペースで25km",
    tips:["テーパリングは本番3週前から","レースシューズで最低1回20km走る","補給食・ウェアの最終確認","11月は走りやすい最高の季節。追い込む"],
  },
  {
    id:5, months:"12月", label:"本番", name:"那覇マラソン！", icon:"🏅",
    color:"#b45309", bg:"#fffbeb", border:"#fde68a",
    goal:"4:30切り！あわよくば4:00切り！", targetPace:"4:30→6:22 / 4:00→5:41",
    desc:"準備は完璧。あとは楽しむだけ。",
    sessions:[
      {week:"12月1週",month:"12月",run:"10km @ 6:00/km",note:"最終確認ラン"},
      {week:"前々日",month:"12月",run:"20〜30分 軽いジョグ",note:"脚を動かす程度"},
      {week:"前日",month:"12月",run:"休養",note:"荷物確認・早寝"},
      {week:"本番当日",month:"12月",run:"42.195km 🎌",note:"前半は貯金。応援を全身で浴びる！"},
    ],
    milestone:"🏅 4:30切り達成！",
    tips:["スタート直後は絶対に飛ばさない","30kmまでは6:30/kmで余裕を作る","残り12kmで貯金を使い切る"],
  },
];

const MONTHS = ["3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"];

const paceRows = [
  {label:"現在の換算",time:"〜4:15",pace:"6:00/km",color:"#64748b",sub:"15kmを6:00で走れる現状から"},
  {label:"目標①",time:"サブ4:30",pace:"6:22/km",color:"#16a34a",sub:"前回比 −15分。達成可能！"},
  {label:"目標②",time:"サブ4:00",pace:"5:41/km",color:"#9333ea",sub:"前回比 −45分。上振れ狙い"},
];

const DB_NAME="nahaMarathon2026", DB_VER=1, STORE="data";
function openDB(){
  return new Promise((res,rej)=>{
    const req=indexedDB.open(DB_NAME,DB_VER);
    req.onupgradeneeded=e=>e.target.result.createObjectStore(STORE);
    req.onsuccess=e=>res(e.target.result);
    req.onerror=e=>rej(e);
  });
}
async function dbGet(key){
  const db=await openDB();
  return new Promise((res,rej)=>{
    const req=db.transaction(STORE,"readonly").objectStore(STORE).get(key);
    req.onsuccess=e=>res(e.target.result);
    req.onerror=e=>rej(e);
  });
}
async function dbSet(key,val){
  const db=await openDB();
  return new Promise((res,rej)=>{
    const tx=db.transaction(STORE,"readwrite");
    tx.objectStore(STORE).put(val,key);
    tx.oncomplete=()=>res();
    tx.onerror=e=>rej(e);
  });
}

const fmtKm   = r=>{const d=r.replace(/[^\d]/g,"").slice(0,4);if(!d)return "";if(d.length<=2)return d;return d.slice(0,-1)+"."+d.slice(-1);};
const fmtPace = r=>{const d=r.replace(/[^\d]/g,"").slice(0,4);if(!d)return "";if(d.length<=2)return d;return d.slice(0,-2)+":"+d.slice(-2);};
const fmtTime = r=>{const d=r.replace(/[^\d]/g,"").slice(0,6);if(!d)return "";if(d.length<=2)return d;if(d.length<=4)return d.slice(0,-2)+":"+d.slice(-2);return d.slice(0,-4)+":"+d.slice(-4,-2)+":"+d.slice(-2);};

function App(){
  const [activePhase,setActivePhase]=useState(0);
  const [checked,setChecked]=useState({});
  const [records,setRecords]=useState({});
  const [openRecord,setOpenRecord]=useState(null);
  const [tab,setTab]=useState("plan");
  const [loaded,setLoaded]=useState(false);
  const [saveFlash,setSaveFlash]=useState(false);
  const [installPrompt,setInstallPrompt]=useState(null);
  const [showBanner,setShowBanner]=useState(false);

  useEffect(()=>{
    (async()=>{
      try{
        const c=await dbGet("checked");if(c)setChecked(c);
        const r=await dbGet("records");if(r)setRecords(r);
      }catch(e){}
      setLoaded(true);
    })();
    const handler=e=>{e.preventDefault();setInstallPrompt(e);setShowBanner(true);};
    window.addEventListener("beforeinstallprompt",handler);
    return()=>window.removeEventListener("beforeinstallprompt",handler);
  },[]);

  useEffect(()=>{
    if(!loaded)return;
    dbSet("checked",checked).catch(()=>{});
    dbSet("records",records).catch(()=>{});
    setSaveFlash(true);
    const t=setTimeout(()=>setSaveFlash(false),1500);
    return()=>clearTimeout(t);
  },[checked,records]);

  const toggle=k=>setChecked(p=>({...p,[k]:!p[k]}));
  const updateRecord=(key,field,value)=>setRecords(p=>({...p,[key]:{...(p[key]||{}),[field]:value}}));

  const phase=phases[activePhase];
  const total=phases.reduce((a,p)=>a+p.sessions.length,0);
  const done=Object.values(checked).filter(Boolean).length;
  const pct=Math.round((done/total)*100);

  const monthlyKm={};
  phases.forEach(ph=>ph.sessions.forEach((s,si)=>{
    const key=ph.id+"-"+si;
    const rec=records[key]||{};
    if(rec.km){
      let m=s.month;
      if(rec.date){const parts=rec.date.split("-");if(parts.length===3){const mo=parseInt(parts[1],10);m=mo+"月";}}
      monthlyKm[m]=(monthlyKm[m]||0)+parseFloat(rec.km||0);
    }
  }));
  const totalKm=Object.values(monthlyKm).reduce((a,v)=>a+v,0);

  if(!loaded)return(
    <div style={{display:"flex",alignItems:"center",justifyContent:"center",height:"100vh",flexDirection:"column",gap:"16px",background:"#f1f5f9"}}>
      <div style={{fontSize:"64px"}}>🏃</div>
      <div style={{fontSize:"15px",color:"#64748b"}} className="pulse">読み込み中...</div>
    </div>
  );

  return(
    <div style={{minHeight:"100vh",background:"#f1f5f9",paddingBottom:showBanner?"80px":"env(safe-area-inset-bottom)"}}>
      <div style={{background:"linear-gradient(135deg,#1d4ed8,#0369a1)",padding:"20px 16px 16px",paddingTop:"calc(20px + env(safe-area-inset-top))"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"12px"}}>
          <div>
            <div style={{fontSize:"9px",letterSpacing:"3px",color:"#bfdbfe",marginBottom:"2px"}}>NAHA MARATHON 2026</div>
            <div style={{fontSize:"20px",fontWeight:"900",color:"#fff",lineHeight:1.2}}>週1回・9ヶ月プラン</div>
            <div style={{fontSize:"11px",color:"#93c5fd",marginTop:"3px"}}>累計 <span style={{color:"#86efac",fontWeight:"700"}}>{totalKm.toFixed(1)}km</span> 走破</div>
          </div>
          <div style={{fontSize:"10px",padding:"5px 10px",borderRadius:"99px",background:saveFlash?"rgba(134,239,172,0.25)":"rgba(255,255,255,0.1)",color:saveFlash?"#86efac":"#93c5fd",border:"1px solid "+(saveFlash?"#86efac50":"transparent"),transition:"all 0.4s",whiteSpace:"nowrap"}}>
            {saveFlash?"✓ 保存済み":"自動保存 ON"}
          </div>
        </div>
        <div style={{display:"flex",justifyContent:"space-between",fontSize:"10px",color:"#93c5fd",marginBottom:"4px"}}>
          <span>進捗</span><span>{done}/{total}（{pct}%）</span>
        </div>
        <div style={{background:"rgba(255,255,255,0.2)",borderRadius:"99px",height:"5px",overflow:"hidden"}}>
          <div style={{height:"100%",width:pct+"%",background:"linear-gradient(90deg,#86efac,#67e8f9)",borderRadius:"99px",transition:"width 0.6s ease"}}/>
        </div>
      </div>

      <div style={{display:"flex",background:"#fff",borderBottom:"1px solid #e2e8f0",position:"sticky",top:0,zIndex:10,boxShadow:"0 1px 4px rgba(0,0,0,0.06)"}}>
        {[["plan","📋 計画"],["monthly","📊 月間"],["pace","⏱ ペース"],["strategy","🧠 戦略"]].map(([key,label])=>(
          <button key={key} onClick={()=>setTab(key)} style={{flex:1,padding:"12px 2px",border:"none",background:tab===key?"#fff":"#f8fafc",color:tab===key?"#1d4ed8":"#94a3b8",fontSize:"11px",cursor:"pointer",fontWeight:tab===key?"700":"400",borderBottom:tab===key?"2px solid #1d4ed8":"2px solid transparent",transition:"color 0.2s"}}>{label}</button>
        ))}
      </div>

      <div style={{padding:"14px 14px 24px",maxWidth:"600px",margin:"0 auto"}} className="fade-in">

        {tab==="plan" && <>
          <div style={{display:"flex",gap:"8px",overflowX:"auto",paddingBottom:"8px",marginBottom:"12px",WebkitOverflowScrolling:"touch"}}>
            {phases.map((p,i)=>(
              <button key={i} onClick={()=>setActivePhase(i)} style={{flexShrink:0,padding:"7px 13px",borderRadius:"99px",border:activePhase===i?"2px solid "+p.color:"1px solid #e2e8f0",background:activePhase===i?p.bg:"#fff",color:activePhase===i?p.color:"#94a3b8",fontSize:"12px",cursor:"pointer",fontWeight:activePhase===i?"700":"400",whiteSpace:"nowrap",transition:"all 0.2s"}}>{p.icon} {p.label}</button>
            ))}
          </div>

          {phase.id===2&&(
            <div style={{background:"#fef2f2",border:"1px solid #fecaca",borderRadius:"10px",padding:"10px 14px",marginBottom:"12px",display:"flex",gap:"8px",alignItems:"flex-start"}}>
              <span style={{fontSize:"18px",flexShrink:0}}>🌡️</span>
              <div>
                <div style={{fontSize:"12px",fontWeight:"700",color:"#dc2626",marginBottom:"2px"}}>夏の特別注意事項（藤沢）</div>
                <div style={{fontSize:"11px",color:"#991b1b"}}>7〜8月は猛暑日連続。夕方17〜19時スタートが比較的涼しいです。ただし湿度が高く体感温度は高め。危険レベルの日は迷わず休養かジムに切り替えてください。</div>
              </div>
            </div>
          )}

          <div style={{background:"#fff",borderRadius:"16px",border:"1px solid "+phase.border,overflow:"hidden",boxShadow:"0 2px 12px rgba(0,0,0,0.06)"}}>
            <div style={{background:phase.bg,padding:"14px 16px",borderBottom:"1px solid "+phase.border}}>
              <div style={{display:"flex",gap:"10px",alignItems:"center",marginBottom:"8px"}}>
                <span style={{fontSize:"28px"}}>{phase.icon}</span>
                <div>
                  <div style={{fontSize:"9px",color:phase.color,letterSpacing:"2px",fontWeight:"700"}}>{phase.months}</div>
                  <div style={{fontSize:"17px",fontWeight:"800",color:"#0f172a"}}>{phase.name}</div>
                </div>
              </div>
              <div style={{fontSize:"11px",color:"#64748b",marginBottom:"10px"}}>{phase.desc}</div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"6px"}}>
                {[["目標",phase.goal],["ペース",phase.targetPace]].map(([k,v])=>(
                  <div key={k} style={{background:"#fff",borderRadius:"8px",padding:"8px 10px",border:"1px solid "+phase.border}}>
                    <div style={{fontSize:"9px",color:"#94a3b8",marginBottom:"1px"}}>{k}</div>
                    <div style={{fontSize:"11px",color:"#1e293b",fontWeight:"600"}}>{v}</div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{padding:"12px 14px"}}>
              <div style={{fontSize:"9px",color:"#94a3b8",letterSpacing:"2px",marginBottom:"10px"}}>週別セッション（タップしてチェック）</div>
              {phase.sessions.map((s,si)=>{
                const key=phase.id+"-"+si;
                const isDone=!!checked[key];
                const rec=records[key]||{};
                const isOpen=openRecord===key;
                return(
                  <div key={si} style={{marginBottom:"6px"}}>
                    <div style={{display:"flex",gap:"10px",alignItems:"flex-start",padding:"10px",background:isDone?phase.bg:"#f8fafc",borderRadius:isOpen?"10px 10px 0 0":"10px",border:isDone?"1px solid "+phase.border:"1px solid #e2e8f0",borderBottom:isOpen?"none":undefined,transition:"background 0.2s"}}>
                      <div onClick={()=>toggle(key)} style={{width:"22px",height:"22px",borderRadius:"6px",flexShrink:0,background:isDone?phase.color:"#fff",border:isDone?"none":"2px solid "+phase.border,display:"flex",alignItems:"center",justifyContent:"center",marginTop:"1px",cursor:"pointer",transition:"all 0.2s"}}>
                        {isDone&&<span style={{fontSize:"13px",color:"#fff",fontWeight:"900"}}>✓</span>}
                      </div>
                      <div style={{flex:1,cursor:"pointer"}} onClick={()=>toggle(key)}>
                        <div style={{display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:"2px",marginBottom:"2px"}}>
                          <span style={{fontSize:"10px",color:phase.color,fontWeight:"700"}}>{s.week}</span>
                          <span style={{fontSize:"12px",fontWeight:"700",color:isDone?"#94a3b8":"#1e293b",textDecoration:isDone?"line-through":"none"}}>{s.run}</span>
                        </div>
                        <div style={{fontSize:"11px",color:isDone?"#94a3b8":"#64748b"}}>{s.note}</div>
                        {(rec.date||rec.km||rec.pace||rec.totalTime||rec.memo)&&!isOpen&&(
                          <div style={{marginTop:"5px",display:"flex",gap:"5px",flexWrap:"wrap"}}>
                            {rec.date&&<span style={{fontSize:"10px",background:"#f1f5f9",color:"#64748b",borderRadius:"99px",padding:"2px 7px"}}>📅{rec.date}</span>}
                            {rec.km&&<span style={{fontSize:"10px",background:phase.color+"18",color:phase.color,borderRadius:"99px",padding:"2px 7px",fontWeight:"700"}}>📍{rec.km}km</span>}
                            {rec.pace&&<span style={{fontSize:"10px",background:phase.color+"18",color:phase.color,borderRadius:"99px",padding:"2px 7px",fontWeight:"700"}}>⏱{rec.pace}</span>}
                            {rec.totalTime&&<span style={{fontSize:"10px",background:phase.color+"18",color:phase.color,borderRadius:"99px",padding:"2px 7px",fontWeight:"700"}}>🏁{rec.totalTime}</span>}
                            {rec.memo&&<span style={{fontSize:"10px",color:"#64748b"}}>💬{rec.memo}</span>}
                          </div>
                        )}
                      </div>
                      <button onClick={e=>{e.stopPropagation();setOpenRecord(isOpen?null:key);}} style={{flexShrink:0,padding:"5px 10px",borderRadius:"99px",border:"1px solid "+phase.border,background:isOpen?phase.color:"#fff",color:isOpen?"#fff":phase.color,fontSize:"10px",cursor:"pointer",fontWeight:"700",whiteSpace:"nowrap",transition:"all 0.2s"}}>{isOpen?"閉じる":"実績"}</button>
                    </div>
                    {isOpen&&(
                      <div style={{background:"#fff",border:"1px solid "+phase.border,borderTop:"1px dashed "+phase.border,borderRadius:"0 0 12px 12px",padding:"14px"}}>
                        <div style={{fontSize:"9px",color:phase.color,letterSpacing:"2px",marginBottom:"10px",fontWeight:"700"}}>実績を記録</div>
                        <div style={{marginBottom:"10px"}}>
                          <div style={{fontSize:"9px",color:"#94a3b8",marginBottom:"4px"}}>実施日</div>
                          <input type="date" value={rec.date||""} onChange={e=>updateRecord(key,"date",e.target.value)} style={{width:"100%",padding:"11px",borderRadius:"8px",border:"1px solid #e2e8f0",fontSize:"15px",outline:"none",background:"#f8fafc",color:"#1e293b"}}/>
                        </div>
                        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"10px",marginBottom:"10px"}}>
                          <div>
                            <div style={{fontSize:"9px",color:"#94a3b8",marginBottom:"4px"}}>実走距離(km)　165→16.5</div>
                            <input type="tel" placeholder="数字を入力" value={rec.km||""} onChange={e=>updateRecord(key,"km",fmtKm(e.target.value))} style={{width:"100%",padding:"11px",borderRadius:"8px",border:"1px solid #e2e8f0",fontSize:"16px",outline:"none",background:"#f8fafc"}}/>
                          </div>
                          <div>
                            <div style={{fontSize:"9px",color:"#94a3b8",marginBottom:"4px"}}>実ペース(/km)　615→6:15</div>
                            <input type="tel" placeholder="数字を入力" value={rec.pace||""} onChange={e=>updateRecord(key,"pace",fmtPace(e.target.value))} style={{width:"100%",padding:"11px",borderRadius:"8px",border:"1px solid #e2e8f0",fontSize:"16px",outline:"none",background:"#f8fafc"}}/>
                          </div>
                        </div>
                        <div style={{marginBottom:"10px"}}>
                          <div style={{fontSize:"9px",color:"#94a3b8",marginBottom:"4px"}}>完走タイム　44500→4:45:00</div>
                          <input type="tel" placeholder="数字を入力" value={rec.totalTime||""} onChange={e=>updateRecord(key,"totalTime",fmtTime(e.target.value))} style={{width:"100%",padding:"11px",borderRadius:"8px",border:"1px solid #e2e8f0",fontSize:"16px",outline:"none",background:"#f8fafc"}}/>
                        </div>
                        <div style={{marginBottom:"12px"}}>
                          <div style={{fontSize:"9px",color:"#94a3b8",marginBottom:"4px"}}>メモ（体感・天気など）</div>
                          <input type="text" placeholder="例: 夕方18時スタート、気温31℃、湿度80%" value={rec.memo||""} onChange={e=>updateRecord(key,"memo",e.target.value)} style={{width:"100%",padding:"11px",borderRadius:"8px",border:"1px solid #e2e8f0",fontSize:"15px",outline:"none",background:"#f8fafc"}}/>
                        </div>
                        <button onClick={()=>setOpenRecord(null)} style={{width:"100%",padding:"13px",borderRadius:"10px",border:"none",background:phase.color,color:"#fff",fontSize:"14px",fontWeight:"700",cursor:"pointer"}}>✓ 保存して閉じる</button>
                      </div>
                    )}
                  </div>
                );
              })}
              <div style={{background:phase.bg,border:"1px solid "+phase.border,borderRadius:"10px",padding:"10px 12px",marginTop:"10px"}}>
                <div style={{fontSize:"9px",color:phase.color,letterSpacing:"2px",marginBottom:"6px",fontWeight:"700"}}>このフェーズのコツ</div>
                {phase.tips.map((t,i)=>(
                  <div key={i} style={{fontSize:"12px",color:"#475569",marginBottom:"3px"}}><span style={{color:phase.color,marginRight:"5px"}}>›</span>{t}</div>
                ))}
              </div>
              <div style={{background:phase.bg,border:"1px solid "+phase.color,borderRadius:"10px",padding:"10px 12px",marginTop:"8px",display:"flex",gap:"8px",alignItems:"center"}}>
                <span style={{fontSize:"18px"}}>🎯</span>
                <div>
                  <div style={{fontSize:"9px",color:"#94a3b8"}}>マイルストーン</div>
                  <div style={{fontSize:"13px",color:phase.color,fontWeight:"700"}}>{phase.milestone}</div>
                </div>
              </div>
            </div>
          </div>
        </>}

        {tab==="monthly" && (
          <div>
            <div style={{background:"linear-gradient(135deg,#1d4ed8,#0369a1)",borderRadius:"16px",padding:"18px 20px",marginBottom:"14px",color:"#fff",boxShadow:"0 4px 16px rgba(29,78,216,0.25)"}}>
              <div style={{fontSize:"10px",letterSpacing:"2px",color:"#bfdbfe",marginBottom:"4px"}}>9ヶ月 累計走行距離</div>
              <div style={{fontSize:"44px",fontWeight:"900",lineHeight:1,color:"#fff"}}>{totalKm.toFixed(1)}<span style={{fontSize:"18px",marginLeft:"4px"}}>km</span></div>
              <div style={{fontSize:"11px",color:"#93c5fd",marginTop:"6px"}}>フルマラソン換算 {(totalKm/42.195).toFixed(1)}本分</div>
            </div>
            {MONTHS.map(month=>{
              const km=monthlyKm[month]||0;
              const sessions=[];
              phases.forEach(ph=>ph.sessions.forEach((s,si)=>{
                const key=ph.id+"-"+si;
                const rec=records[key]||{};
                if(rec.km){
                  let m=s.month;
                  if(rec.date){const parts=rec.date.split("-");if(parts.length===3){const mo=parseInt(parts[1],10);m=mo+"月";}}
                  if(m===month)sessions.push({week:s.week,km:parseFloat(rec.km),pace:rec.pace,date:rec.date});
                }
              }));
              const maxKm=Math.max(...MONTHS.map(m=>monthlyKm[m]||0),1);
              const barPct=Math.round((km/maxKm)*100);
              const isSummer=month==="7月"||month==="8月";
              return(
                <div key={month} style={{background:"#fff",borderRadius:"12px",border:"1px solid "+(isSummer?"#fecaca":"#e2e8f0"),marginBottom:"10px",overflow:"hidden",boxShadow:"0 1px 6px rgba(0,0,0,0.04)"}}>
                  <div style={{padding:"12px 14px 10px"}}>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"8px"}}>
                      <span style={{fontSize:"14px",fontWeight:"700",color:"#1e293b"}}>{month}{isSummer&&<span style={{fontSize:"10px",color:"#dc2626",marginLeft:"4px"}}>☀️ 猛暑期・距離控えめ</span>}</span>
                      <span style={{fontSize:"20px",fontWeight:"900",color:km>0?"#1d4ed8":"#94a3b8"}}>{km>0?km.toFixed(1):"−"}<span style={{fontSize:"12px"}}> km</span></span>
                    </div>
                    <div style={{background:"#f1f5f9",borderRadius:"99px",height:"6px",overflow:"hidden",marginBottom:"8px"}}>
                      <div style={{height:"100%",width:barPct+"%",background:isSummer?"linear-gradient(90deg,#dc2626,#f97316)":"linear-gradient(90deg,#1d4ed8,#0ea5e9)",borderRadius:"99px",transition:"width 0.6s ease"}}/>
                    </div>
                    {sessions.length>0?sessions.map((s,i)=>(
                      <div key={i} style={{display:"flex",justifyContent:"space-between",fontSize:"11px",color:"#64748b",padding:"4px 0",borderTop:"1px solid #f1f5f9"}}>
                        <span>{s.date?s.date+" ":""}{s.week}</span>
                        <span style={{color:"#1d4ed8",fontWeight:"600"}}>{s.km.toFixed(1)}km{s.pace?" @ "+s.pace:""}</span>
                      </div>
                    )):(
                      <div style={{fontSize:"11px",color:"#cbd5e1",textAlign:"center",padding:"4px 0"}}>まだ記録なし</div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {tab==="pace" && (
          <div>
            <div style={{textAlign:"center",marginBottom:"14px"}}>
              <div style={{fontSize:"10px",color:"#94a3b8",letterSpacing:"2px",marginBottom:"2px"}}>あなたの現状とゴール</div>
              <div style={{fontSize:"16px",fontWeight:"700",color:"#0f172a"}}>ペース・タイム対照表</div>
            </div>
            {paceRows.map((row,i)=>(
              <div key={i} style={{background:"#fff",borderRadius:"12px",border:"2px solid "+row.color+"30",padding:"14px 16px",marginBottom:"10px",display:"flex",justifyContent:"space-between",alignItems:"center",boxShadow:"0 1px 6px rgba(0,0,0,0.04)"}}>
                <div>
                  <div style={{fontSize:"10px",color:row.color,fontWeight:"700"}}>{row.label}</div>
                  <div style={{fontSize:"22px",fontWeight:"900",color:"#0f172a",margin:"2px 0"}}>{row.time}</div>
                  <div style={{fontSize:"10px",color:"#94a3b8"}}>{row.sub}</div>
                </div>
                <div style={{textAlign:"right"}}>
                  <div style={{fontSize:"10px",color:"#94a3b8",marginBottom:"2px"}}>キロあたり</div>
                  <div style={{fontSize:"26px",fontWeight:"900",color:row.color}}>{row.pace}</div>
                </div>
              </div>
            ))}
            <div style={{background:"#fff",borderRadius:"12px",border:"1px solid #e2e8f0",padding:"14px 16px",boxShadow:"0 1px 6px rgba(0,0,0,0.04)"}}>
              <div style={{fontSize:"10px",color:"#1d4ed8",letterSpacing:"2px",marginBottom:"12px",fontWeight:"700"}}>中間チェックポイント</div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",fontSize:"9px",color:"#94a3b8",marginBottom:"6px"}}>
                <span>地点</span><span style={{textAlign:"center",color:"#16a34a"}}>サブ4:30</span><span style={{textAlign:"right",color:"#9333ea"}}>サブ4:00</span>
              </div>
              {[
                {km:"10km",s430:"1:03:40",s400:"0:56:50"},
                {km:"ハーフ",s430:"2:14:00",s400:"1:59:38"},
                {km:"30km",s430:"3:11:00",s400:"2:50:30"},
                {km:"35km",s430:"3:42:50",s400:"3:18:55"},
                {km:"ゴール🏁",s430:"4:30:00",s400:"4:00:00"},
              ].map((row,i,arr)=>(
                <div key={i} style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",padding:"8px 0",borderTop:"1px solid #f1f5f9",fontSize:"13px",fontWeight:i===arr.length-1?"900":"400"}}>
                  <span style={{color:"#475569"}}>{row.km}</span>
                  <span style={{color:"#16a34a",textAlign:"center"}}>{row.s430}</span>
                  <span style={{color:"#9333ea",textAlign:"right"}}>{row.s400}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab==="strategy" && (
          <div>
            {[
              {icon:"☀️",title:"夏（7〜8月）の乗り越え方",color:"#dc2626",bg:"#fef2f2",border:"#fecaca",
                items:["夕方17〜19時スタートが比較的涼しくおすすめ","日没後は暗くなるのでライト・反射材を着用","Yahoo天気「危険」レベルの日はジムか休養","距離より「継続すること」を最優先","水分は15〜20分ごと・塩タブ必携"]},
              {icon:"🚀",title:"レース当日の走り方",color:"#1d4ed8",bg:"#eff6ff",border:"#bfdbfe",
                items:["【0〜10km】人混みに流されず6:30〜6:40/km","【10〜25km】リズムに乗る。6:20〜6:25/kmキープ","【25〜35km】ここが勝負。ペースを落とさない","【35〜42km】貯金を使い切る！ラスト3km全力"]},
              {icon:"💧",title:"補給戦略",color:"#0891b2",bg:"#ecfeff",border:"#a5f3fc",
                items:["スタート前：ジェル1本+水200ml","15km・25km・33kmでジェル補給（練習で必ず試す）","給水所は全部使う。歩きながら飲んでOK","那覇は暑い。塩分タブレットも携帯"]},
              {icon:"🏃",title:"週1回を最大化するコツ",color:"#ea580c",bg:"#fff7ed",border:"#fed7aa",
                items:["週1回はロング走に全振り（スピード練習不要）","走れない日は歩く・階段・体幹トレで代替","練習後に距離・ペース・体感をアプリに記録","睡眠と食事がトレーニングの半分"]},
              {icon:"📅",title:"大会前カレンダー",color:"#9333ea",bg:"#faf5ff",border:"#e9d5ff",
                items:["7〜8月：距離を抑えて夏を乗り越える","9月：ハーフ大会に出場（本番シミュレーション）","9〜10月：ロング走で距離を積み上げる","11月第3週：テーパー開始","本番前日：10〜15分ジョグのみ・早寝"]},
            ].map((sec,i)=>(
              <div key={i} style={{background:"#fff",borderRadius:"12px",border:"1px solid "+sec.border,marginBottom:"10px",overflow:"hidden",boxShadow:"0 1px 6px rgba(0,0,0,0.04)"}}>
                <div style={{padding:"10px 14px",background:sec.bg,borderBottom:"1px solid "+sec.border,display:"flex",gap:"8px",alignItems:"center"}}>
                  <span style={{fontSize:"16px"}}>{sec.icon}</span>
                  <span style={{fontWeight:"700",color:sec.color,fontSize:"13px"}}>{sec.title}</span>
                </div>
                <div style={{padding:"10px 14px"}}>
                  {sec.items.map((item,j)=>(
                    <div key={j} style={{fontSize:"13px",color:"#475569",padding:"5px 0",borderBottom:j<sec.items.length-1?"1px solid #f1f5f9":"none",display:"flex",gap:"6px"}}>
                      <span style={{color:sec.color,flexShrink:0}}>›</span>{item}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        <div style={{textAlign:"center",marginTop:"20px",fontSize:"11px",color:"#94a3b8"}}>
          夏を乗り越えた先に、ゴールが待っている 🏅
        </div>
      </div>

      {showBanner&&(
        <div style={{position:"fixed",bottom:0,left:0,right:0,background:"#1d4ed8",color:"#fff",padding:"14px 16px",paddingBottom:"calc(14px + env(safe-area-inset-bottom))",display:"flex",alignItems:"center",justifyContent:"space-between",gap:"12px",boxShadow:"0 -4px 20px rgba(0,0,0,0.25)",zIndex:100}}>
          <div>
            <div style={{fontSize:"13px",fontWeight:"700"}}>📱 ホーム画面に追加</div>
            <div style={{fontSize:"11px",color:"#bfdbfe",marginTop:"1px"}}>アプリのように使えます</div>
          </div>
          <div style={{display:"flex",gap:"8px",flexShrink:0}}>
            <button onClick={()=>setShowBanner(false)} style={{padding:"8px 12px",borderRadius:"8px",border:"1px solid rgba(255,255,255,0.3)",background:"transparent",color:"#93c5fd",fontSize:"12px",cursor:"pointer"}}>後で</button>
            <button onClick={()=>{installPrompt.prompt();setShowBanner(false);}} style={{padding:"8px 16px",borderRadius:"8px",border:"none",background:"#fff",color:"#1d4ed8",fontSize:"12px",fontWeight:"700",cursor:"pointer"}}>追加する</button>
          </div>
        </div>
      )}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
