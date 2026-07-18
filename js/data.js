// Données de l'application : prières, mystères, litanies.
// Langue unique pour le moment : français ('fr'). Structure prête pour
// ajouter d'autres langues plus tard (voir IDEES-FUTURES.txt).
//
// IMPORTANT : les champs `text` des prières ci-dessous sont VOLONTAIREMENT
// VIDES. Remplissez-les vous-même avec le texte exact que vous souhaitez
// utiliser (chaque prière est une chaîne de caractères ; utilisez \n pour
// les retours à la ligne).

const PRAYERS = {
  signOfCross: {
    title: "Signe de croix",
    text: "Au nom du Père, et du Fils, et du Saint-Esprit. Amen.",
  },
  credo: {
    title: "Symbole des Apôtres",
    text: "Je crois en Dieu, le Père tout-puissant, Créateur du ciel et de la terre. Et en Jésus-Christ, son Fils unique, notre Seigneur, qui a été conçu du Saint-Esprit, est né de la Vierge Marie, a souffert sous Ponce Pilate, a été crucifié, est mort et a été enseveli, est descendu aux enfers, le troisième jour est ressuscité des morts, est monté aux cieux, est assis à la droite de Dieu le Père tout-puissant, d'où il viendra juger les vivants et les morts. Je crois en l'Esprit Saint, à la sainte Église catholique, à la communion des saints, à la rémission des péchés, à la résurrection de la chair, à la vie éternelle. Amen.",
  },
  ourFather: {
    title: "Notre Père",
    text: "Notre Père, qui es aux cieux, que ton nom soit sanctifié, que ton règne vienne, que ta volonté soit faite sur la terre comme au ciel. Donne-nous aujourd'hui notre pain de ce jour. Pardonne-nous nos offenses, comme nous pardonnons aussi à ceux qui nous ont offensés. Et ne nous laisse pas entrer en tentation, mais délivre-nous du mal. Amen.",
  },
  hailMary: {
    title: "Je vous salue Marie",
    text: "Je vous salue, Marie, pleine de grâce, le Seigneur est avec vous. Vous êtes bénie entre toutes les femmes, et Jésus, le fruit de vos entrailles, est béni. Sainte Marie, Mère de Dieu, priez pour nous pauvres pécheurs, maintenant et à l'heure de notre mort. Amen.",
  },
  gloryBe: {
    title: "Gloire au Père",
    text: "Gloire au Père, et au Fils, et au Saint-Esprit, comme il était au commencement, maintenant et toujours, et dans les siècles des siècles. Amen.",
  },
  fatimaPrayer: {
    title: "Prière de Fatima (Ô mon Jésus)",
    text: "Ô mon Jésus, pardonnez-nous nos péchés, préservez-nous du feu de l'enfer, conduisez au ciel toutes les âmes, surtout celles qui ont le plus besoin de votre miséricorde.",
  },
  salveRegina: {
    title: "Salve Regina",
    text: "Salut, ô Reine, Mère de miséricorde, notre vie, notre douceur et notre espérance, salut ! Enfants d'Ève, exilés, nous crions vers vous ; vers vous, nous soupirons, gémissant et pleurant dans cette vallée de larmes. Ô vous, notre avocate, tournez vers nous vos regards miséricordieux. Et, après cet exil, montrez-nous Jésus, le fruit béni de vos entrailles. Ô clémente, ô miséricordieuse, ô douce Vierge Marie.",
  },
  memorare: {
    title: "Souvenez-vous (Memorare)",
    text: "Souvenez-vous, ô très miséricordieuse Vierge Marie, qu'on n'a jamais entendu dire qu'aucun de ceux qui ont eu recours à votre protection, imploré votre assistance et réclamé votre secours, ait été abandonné. Animé d'une pareille confiance, ô Vierge des vierges, ô ma Mère, je viens à vous, et gémissant sous le poids de mes péchés, je me prosterne à vos pieds. Ô Mère du Verbe incarné, ne méprisez pas mes prières, mais écoutez-les favorablement et daignez les exaucer. Amen.",
  },
  prayerToStJoseph: {
    title: "Prière à saint Joseph",
    text: "À vous, bienheureux Joseph, nous avons recours dans notre tribulation ; et après avoir imploré le secours de votre très sainte épouse, nous demandons avec confiance votre patronage. Nous vous en supplions, par cette charité qui vous unissait à l'Immaculée Vierge Mère de Dieu, et par l'amour paternel que vous avez porté à l'Enfant Jésus, jetez, nous vous en conjurons, un regard favorable sur l'héritage que Jésus-Christ a acquis par son sang, et assistez-nous dans nos besoins par votre secours et votre puissance. Protégez, ô très prévoyant gardien de la divine Famille, la race choisie de Jésus-Christ ; écartez de nous, tendre père, toute souillure d'erreur et de vice ; assistez-nous du haut du ciel, ô notre puissant libérateur, dans ce combat contre les puissances des ténèbres ; et comme vous avez arraché autrefois l'Enfant Jésus au péril de sa vie, défendez aujourd'hui la sainte Église de Dieu contre les embûches de ses ennemis et contre toute adversité. Couvrez-nous tous d'une protection de tous les instants, afin qu'à votre exemple et soutenus par votre secours, nous puissions vivre saintement, mourir pieusement et obtenir la félicité éternelle dans les cieux. Amen.",
  },
};

const LITANIES = {
  loreto: {
    title: "Litanies de la Vierge Marie (Litanies de Lorette)",
    lines: [
      { call: "Seigneur", response: "ayez pitié de nous." },
      { call: "Christ", response: "ayez pitié de nous." },
      { call: "Seigneur", response: "ayez pitié de nous." },
      { call: "Christ, écoutez-nous", response: "Christ, écoutez-nous." },
      { call: "Christ, exaucez-nous", response: "Christ, exaucez-nous." },
      { call: "Père céleste, qui êtes Dieu", response: "ayez pitié de nous." },
      { call: "Fils, Rédempteur du monde, qui êtes Dieu", response: "ayez pitié de nous." },
      { call: "Esprit-Saint, qui êtes Dieu", response: "ayez pitié de nous." },
      { call: "Trinité Sainte, qui êtes un seul Dieu", response: "ayez pitié de nous." },

      { call: "Sainte Marie", response: "priez pour nous." },
      { call: "Sainte Mère de Dieu", response: "priez pour nous." },
      { call: "Sainte Vierge des vierges", response: "priez pour nous." },
      { call: "Mère du Christ", response: "priez pour nous." },
      { call: "Mère de l'Église", response: "priez pour nous." },
      { call: "Mère de la divine grâce", response: "priez pour nous." },
      { call: "Mère très pure", response: "priez pour nous." },
      { call: "Mère très chaste", response: "priez pour nous." },
      { call: "Mère toujours vierge", response: "priez pour nous." },
      { call: "Mère sans tache", response: "priez pour nous." },
      { call: "Mère aimable", response: "priez pour nous." },
      { call: "Mère admirable", response: "priez pour nous." },
      { call: "Mère du bon conseil", response: "priez pour nous." },
      { call: "Mère du Créateur", response: "priez pour nous." },
      { call: "Mère du Sauveur", response: "priez pour nous." },

      { call: "Vierge très prudente", response: "priez pour nous." },
      { call: "Vierge digne de vénération", response: "priez pour nous." },
      { call: "Vierge digne de louange", response: "priez pour nous." },
      { call: "Vierge puissante", response: "priez pour nous." },
      { call: "Vierge clémente", response: "priez pour nous." },
      { call: "Vierge fidèle", response: "priez pour nous." },

      { call: "Miroir de justice", response: "priez pour nous." },
      { call: "Siège de la Sagesse", response: "priez pour nous." },
      { call: "Cause de notre joie", response: "priez pour nous." },
      { call: "Vase spirituel", response: "priez pour nous." },
      { call: "Vase d'honneur", response: "priez pour nous." },
      { call: "Vase insigne de dévotion", response: "priez pour nous." },
      { call: "Rose mystique", response: "priez pour nous." },
      { call: "Tour de David", response: "priez pour nous." },
      { call: "Tour d'ivoire", response: "priez pour nous." },
      { call: "Maison d'or", response: "priez pour nous." },
      { call: "Arche d'alliance", response: "priez pour nous." },
      { call: "Porte du ciel", response: "priez pour nous." },
      { call: "Étoile du matin", response: "priez pour nous." },

      { call: "Salut des infirmes", response: "priez pour nous." },
      { call: "Refuge des pécheurs", response: "priez pour nous." },
      { call: "Consolatrice des affligés", response: "priez pour nous." },
      { call: "Secours des chrétiens", response: "priez pour nous." },

      { call: "Reine des Anges", response: "priez pour nous." },
      { call: "Reine des Patriarches", response: "priez pour nous." },
      { call: "Reine des Prophètes", response: "priez pour nous." },
      { call: "Reine des Apôtres", response: "priez pour nous." },
      { call: "Reine des Martyrs", response: "priez pour nous." },
      { call: "Reine des Confesseurs", response: "priez pour nous." },
      { call: "Reine des Vierges", response: "priez pour nous." },
      { call: "Reine de tous les Saints", response: "priez pour nous." },
      { call: "Reine conçue sans le péché originel", response: "priez pour nous." },
      { call: "Reine assumée dans le ciel", response: "priez pour nous." },
      { call: "Reine du très saint Rosaire", response: "priez pour nous." },
      { call: "Reine de la famille", response: "priez pour nous." },
      { call: "Reine de la paix", response: "priez pour nous." },

      { call: "Agneau de Dieu, qui effacez les péchés du monde", response: "pardonnez-nous, Seigneur." },
      { call: "Agneau de Dieu, qui effacez les péchés du monde", response: "exaucez-nous, Seigneur." },
      { call: "Agneau de Dieu, qui effacez les péchés du monde", response: "ayez pitié de nous." },
    ],
  },
};

// Les 20 mystères du Rosaire, répartis en 4 séries.
// title / reference / fruit / meditation sont rédigés (contenu de
// méditation, pas le texte liturgique des prières).
const MYSTERIES = {
  joyful: {
    title: "Mystères Joyeux",
    days: [1, 6], // lundi, samedi
    items: [
      {
        title: "L'Annonciation",
        reference: "Luc 1, 26-38",
        fruit: "L'humilité",
        meditation:
          "L'ange Gabriel annonce à Marie qu'elle sera la mère du Sauveur. Par son « Fiat », son abandon total à la volonté de Dieu, elle nous apprend à accueillir le projet de Dieu dans nos propres vies, même quand il nous dépasse.",
      },
      {
        title: "La Visitation",
        reference: "Luc 1, 39-56",
        fruit: "La charité fraternelle",
        meditation:
          "Marie se met en route pour aider sa cousine Élisabeth. Ce mystère nous invite à porter le Christ aux autres par des gestes concrets de service et d'attention, sans attendre qu'on nous le demande.",
      },
      {
        title: "La Nativité",
        reference: "Luc 2, 1-20",
        fruit: "L'esprit de pauvreté",
        meditation:
          "Jésus naît dans le dénuement d'une étable. Dieu choisit la simplicité et la pauvreté pour venir parmi nous, nous invitant à détacher notre cœur des richesses pour l'ouvrir à l'essentiel.",
      },
      {
        title: "La Présentation au Temple",
        reference: "Luc 2, 22-38",
        fruit: "L'obéissance",
        meditation:
          "Marie et Joseph présentent Jésus au Temple selon la Loi. Ce geste d'obéissance simple et confiante nous rappelle la valeur de la fidélité aux petites choses demandées par Dieu au quotidien.",
      },
      {
        title: "Le Recouvrement de Jésus au Temple",
        reference: "Luc 2, 41-52",
        fruit: "La joie de trouver Jésus",
        meditation:
          "Après trois jours d'angoisse, Marie et Joseph retrouvent Jésus au Temple, « occupé aux affaires de son Père ». Ce mystère nous encourage à persévérer dans la recherche de Dieu, même lorsqu'il semble s'être éloigné.",
      },
    ],
  },
  sorrowful: {
    title: "Mystères Douloureux",
    days: [2, 5], // mardi, vendredi
    items: [
      {
        title: "L'Agonie au jardin des Oliviers",
        reference: "Luc 22, 39-46",
        fruit: "La contrition, le regret du péché",
        meditation:
          "Jésus, saisi d'angoisse devant la souffrance qui vient, prie « que ta volonté soit faite ». Il nous enseigne à confier nos peurs et nos épreuves à Dieu plutôt qu'à les fuir.",
      },
      {
        title: "La Flagellation",
        reference: "Jean 19, 1",
        fruit: "La pureté et la maîtrise des sens",
        meditation:
          "Jésus est injustement flagellé dans sa chair. Ce mystère nous appelle à la pénitence et à la maîtrise de nous-mêmes, en réparation du péché qui blesse le Corps du Christ.",
      },
      {
        title: "Le Couronnement d'épines",
        reference: "Jean 19, 2-3",
        fruit: "Le courage, le mépris de la vanité du monde",
        meditation:
          "Moqué et couronné d'épines, Jésus, vrai Roi, subit l'humiliation en silence. Il nous invite à ne pas chercher les honneurs du monde et à porter avec dignité nos propres épreuves.",
      },
      {
        title: "Le Portement de croix",
        reference: "Jean 19, 17",
        fruit: "La patience",
        meditation:
          "Jésus porte sa croix jusqu'au Calvaire. Ce mystère nous rappelle que chacun est appelé à porter sa propre croix à sa suite, avec patience et confiance.",
      },
      {
        title: "La Crucifixion et la mort de Jésus",
        reference: "Jean 19, 18-30",
        fruit: "Le pardon des offenses",
        meditation:
          "Sur la croix, Jésus offre sa vie et pardonne à ceux qui le crucifient. Ce mystère central de notre foi nous appelle à l'imiter dans le pardon, quel qu'en soit le prix.",
      },
    ],
  },
  glorious: {
    title: "Mystères Glorieux",
    days: [3, 0], // mercredi, dimanche
    items: [
      {
        title: "La Résurrection",
        reference: "Jean 20, 1-18",
        fruit: "La foi",
        meditation:
          "Le Christ triomphe de la mort et se relève glorieux. Ce mystère fonde notre foi et notre espérance : la vie l'emporte toujours sur la mort pour ceux qui s'unissent au Christ.",
      },
      {
        title: "L'Ascension",
        reference: "Luc 24, 50-53",
        fruit: "L'espérance et le désir du Ciel",
        meditation:
          "Jésus retourne auprès du Père et nous ouvre le chemin du Ciel. Ce mystère tourne nos regards vers notre destinée finale et nourrit notre espérance.",
      },
      {
        title: "La Pentecôte",
        reference: "Actes des Apôtres 2, 1-13",
        fruit: "L'amour de Dieu et le don de sagesse",
        meditation:
          "L'Esprit Saint descend sur les Apôtres et Marie réunis au Cénacle. Nous demandons dans ce mystère d'être, nous aussi, remplis de l'Esprit pour témoigner du Christ avec courage.",
      },
      {
        title: "L'Assomption de Marie",
        reference: "Tradition de l'Église",
        fruit: "Une bonne mort et la dévotion à Marie",
        meditation:
          "Marie est élevée corps et âme auprès de son Fils. Ce mystère nous rappelle notre propre destinée de gloire et nous encourage à confier notre fin dernière à son intercession.",
      },
      {
        title: "Le Couronnement de Marie",
        reference: "Tradition de l'Église",
        fruit: "La persévérance finale et la confiance en Marie",
        meditation:
          "Marie est couronnée Reine du Ciel et de la terre. Ce dernier mystère nous invite à nous confier à elle comme une mère, jusqu'au terme de notre propre chemin.",
      },
    ],
  },
  luminous: {
    title: "Mystères Lumineux",
    days: [4], // jeudi
    items: [
      {
        title: "Le Baptême de Jésus au Jourdain",
        reference: "Matthieu 3, 13-17",
        fruit: "L'ouverture à l'Esprit Saint",
        meditation:
          "Jésus, bien que sans péché, descend dans les eaux du Jourdain. Le Père le proclame « Fils bien-aimé » : ce mystère nous rappelle la dignité reçue à notre propre baptême.",
      },
      {
        title: "Les Noces de Cana",
        reference: "Jean 2, 1-11",
        fruit: "La confiance en l'intercession de Marie",
        meditation:
          "À la demande de Marie, Jésus change l'eau en vin, son premier signe. Ce mystère nous enseigne à tout faire « ce qu'il nous dira », en toute confiance envers Marie.",
      },
      {
        title: "L'Annonce du Royaume et l'appel à la conversion",
        reference: "Marc 1, 14-15",
        fruit: "La conversion du cœur",
        meditation:
          "Jésus proclame la Bonne Nouvelle et appelle à la conversion. Ce mystère nous invite à un examen sincère de notre cœur et à un retour confiant vers Dieu.",
      },
      {
        title: "La Transfiguration",
        reference: "Matthieu 17, 1-9",
        fruit: "Le désir de sainteté",
        meditation:
          "Sur le mont Thabor, Jésus laisse entrevoir sa gloire divine à trois de ses disciples. Ce mystère nourrit en nous le désir de la sainteté et de la contemplation de Dieu.",
      },
      {
        title: "L'Institution de l'Eucharistie",
        reference: "Luc 22, 14-20",
        fruit: "L'adoration et la dévotion eucharistique",
        meditation:
          "Au soir de la Cène, Jésus se donne lui-même sous les signes du pain et du vin. Ce mystère nous appelle à un amour toujours plus grand pour l'Eucharistie, mémorial de son sacrifice.",
      },
    ],
  },
};

// Détermine la série de mystères du jour selon le calendrier standard.
function mysteryKeyForDay(dayOfWeek) {
  // dayOfWeek : 0 = dimanche ... 6 = samedi (Date.getDay())
  for (const [key, series] of Object.entries(MYSTERIES)) {
    if (series.days.includes(dayOfWeek)) return key;
  }
  return "joyful";
}
