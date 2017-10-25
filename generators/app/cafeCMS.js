const fetch = require('node-fetch');

const cafeAPIURL = 'https://api.cms.cafe/graphql';
// Const cafeAPIURL = 'https://cafe-staging.trioxis.com/graphql'

function cafeAPIRequest(query, variables = {}, session) {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Cookie: session ? 'sessionToken=' + session : undefined
    },
    body: JSON.stringify({
      query,
      variables
    })
  };

  return fetch(cafeAPIURL, options).then(res => {
    if (res.status !== 200) {
      return res.text().then(text => {
        console.error(text);
        throw new Error(res.status + ' ' + res.statusText + ' to ' + cafeAPIURL);
      });
    }
    return res.json().then(res => {
      if (res.errors && res.errors.length > 0) {
        console.error(res.errors.map(err => err.message));
        throw new Error('Error in response from ' + cafeAPIURL);
      } else {
        return res;
      }
    });
  });
}

const createUserMutation = `mutation($key:String! $secret:String! $website:String!){
  createUser(key:$key,secret:$secret,website:$website){
    id
  }
}`;

const authenticateMutation = `mutation($key:String! $secret:String!){
  generateUserSession(key:$key,secret:$secret)
}`;

const createContentMutation = `mutation(
  $siteName:String!,
  $mainText:String!
){
  siteTitle:upsertTextContent(
    slug:"site-title",
    text:$siteName
  ) {
    id
  }
  
  heroText:upsertTextContent(
    slug:"hero-text",
    text:"Built with Cafe CMS"
  ) {
    id
  }
  
  mainText:upsertTextContent(
    slug:"main-text",
    text:$mainText
  ) {
    id
  }
}`;

const loremMarkdown =
  '# Caput orbem laeta\r\n\r\n## Glaebis oscula sub celebravit letique vicit\r\n\r\nLorem markdownum ter unda medio terra medio gauderet Pulchrior nutrici negarent\r\nIsthmo? Expetit deprensum Graiae.\r\n\r\n- Tabula ab Iano Minervae Ceyx socialis quid\r\n- Vinctum intravere ipse\r\n- Oblitus qua tibi urbem tellus\r\n- Inpulsumque et hoc quid aut\r\n- Iam innubere vestigia iners fortiter feri nunc\r\n- Superat nemorosis cum\r\n\r\n## Usque concretaque deus\r\n\r\nSic tanti color: collo adfatur surgit, temporis condiderat guttas plenaque\r\nPirithous moriens. Revelli quaerebat sperata usus.\r\n\r\n- Miratur purpura sceleri et illa neci\r\n- Hic ignesque sanguis multa trabes utilitas vagae\r\n- Admirabile iacet mihi est gentesque\r\n- Simul hic noctis ut subitae cumque\r\n- Addita tantaeque\r\n- Erimus neque fuit\r\n\r\n## Servata Cupido indueret mutavit subruit\r\n\r\nErroribus finierat flexumque hic haud massa dedecus indeiecta iustius\r\nmelioribus. Socii *Polyphemon* Atrides Phineu suis laudavit **carissime**! In\r\npuer poscitis erat gemitus discite delectat et iraque volucresque conplevit\r\nsuos. Quasque **habitabat lacrimis**.\r\n\r\n> Cur cepit quod, ardent inplicet paelex inque fruitur liberat consequitur boves\r\n> durus Syrtis cui horum. Et opem eodem te robore faciem illic Morphea Acheronta\r\n> litat. Silva staret modulata *vestibus et* dixit carmen genuit cadme damnantem\r\n> nurusque, non agros pro vicimus aurea. Signum cetera laurumque Hypaepis in\r\n> habenas, me rota hic et.\r\n\r\n## Neque quod damno pedibus refugitque matris sed\r\n\r\nUt facta providus suoque! In concretam procul adest quod, Troiae, *ille\r\nCalaureae* ut tecta tetigit virorum, per quibus fulgura fuisset correpta.\r\n\r\n> Telaque fixit properamus et tecum, Nape vota sonitu humo terris parentis\r\n> Finierat Lichan; mollit. Voce palpitat *tangit* facta quae\r\n> [tanti](http://nocituraque.com/namque.php) bene deum postquam, sed sine,\r\n> turbamque prolem. Solum plura relatu sperata, suos non, ipse fallit veterum\r\n> reliquit urbem auras!\r\n\r\nModo tuam ripae; sed dolor potes lentas longi Taenarides bene, *cur*. Monstrum\r\nperimat. Cum ore missa nec, haeret, dum cubat, forent per quantumque talibus et\r\nfides. Et caede *domum* est ut nituntur aptus quinquennem posse tua clipeus.';

module.exports.createUser = opts => cafeAPIRequest(createUserMutation, opts);
module.exports.authenticate = opts => cafeAPIRequest(authenticateMutation, opts);

module.exports.createContent = (opts, session) =>
  cafeAPIRequest(
    createContentMutation,
    Object.assign({ mainText: loremMarkdown }, opts),
    session
  );
