import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-generalsettings',
  templateUrl: './generalsettings.component.html',
  styleUrls: ['./generalsettings.component.css']
})
export class GeneralsettingsComponent {


  constructor(private authService:AuthService,private router:Router){}
  
    logout():void {
      this.authService.logout();
  
   this.router.navigate(['/login']);  }
  user = {
    firstName: 'Jane',
    lastName: 'Wilson',
    email: 'janewilson@gmail.com',
    phone: '555-55-2347',
    company: 'Buildium',
    birthday: '12-11-1999',
    avatar: 'assets/isra.jpg'
  };
  notifications = [2,1];
  pays: string[] = [
    "Afghanistan", "Afrique du Sud", "Albanie", "Algérie", "Allemagne", "Andorre", "Angola",
    "Antigua-et-Barbuda", "Arabie saoudite", "Argentine", "Arménie", "Australie", "Autriche",
    "Azerbaïdjan", "Bahamas", "Bahreïn", "Bangladesh", "Barbade", "Belgique", "Belize", "Bénin",
    "Bhoutan", "Biélorussie", "Birmanie", "Bolivie", "Bosnie-Herzégovine", "Botswana", "Brésil",
    "Brunei", "Bulgarie", "Burkina Faso", "Burundi", "Cambodge", "Cameroun", "Canada", "Cap-Vert",
    "République centrafricaine", "Chili", "Chine", "Chypre", "Colombie", "Comores",
    "République du Congo", "République démocratique du Congo", "Corée du Nord", "Corée du Sud",
    "Costa Rica", "Côte d'Ivoire", "Croatie", "Cuba", "Danemark", "Djibouti", "Dominique", "Égypte",
    "Émirats arabes unis", "Équateur", "Érythrée", "Espagne", "Estonie", "Eswatini", "États-Unis",
    "Éthiopie", "Fidji", "Finlande", "France", "Gabon", "Gambie", "Géorgie", "Ghana", "Grèce",
    "Grenade", "Guatemala", "Guinée", "Guinée-Bissau", "Guinée équatoriale", "Guyana", "Haïti",
    "Honduras", "Hongrie", "Inde", "Indonésie", "Irak", "Iran", "Irlande", "Islande", "Israël",
    "Italie", "Jamaïque", "Japon", "Jordanie", "Kazakhstan", "Kenya", "Kirghizistan", "Kiribati",
    "Koweït", "Laos", "Lesotho", "Lettonie", "Liban", "Liberia", "Libye", "Liechtenstein", "Lituanie",
    "Luxembourg", "Macédoine du Nord", "Madagascar", "Malaisie", "Malawi", "Maldives", "Mali",
    "Malte", "Maroc", "Îles Marshall", "Maurice", "Mauritanie", "Mexique", "Micronésie", "Moldavie",
    "Monaco", "Mongolie", "Monténégro", "Mozambique", "Namibie", "Nauru", "Népal", "Nicaragua",
    "Niger", "Nigéria", "Niue", "Norvège", "Nouvelle-Zélande", "Oman", "Ouganda", "Ouzbékistan",
    "Pakistan", "Palaos", "Palestine", "Panama", "Papouasie-Nouvelle-Guinée", "Paraguay",
    "Pays-Bas", "Pérou", "Philippines", "Pologne", "Portugal", "Qatar", "Roumanie", "Royaume-Uni",
    "Russie", "Rwanda", "Saint-Christophe-et-Niévès", "Sainte-Lucie", "Saint-Marin",
    "Saint-Vincent-et-les-Grenadines", "Salomon", "Salvador", "Samoa", "Sao Tomé-et-Principe",
    "Sénégal", "Serbie", "Seychelles", "Sierra Leone", "Singapour", "Slovaquie", "Slovénie",
    "Somalie", "Soudan", "Soudan du Sud", "Sri Lanka", "Suède", "Suisse", "Suriname", "Syrie",
    "Tadjikistan", "Tanzanie", "Tchad", "République tchèque", "Thaïlande", "Timor oriental", "Togo",
    "Tonga", "Trinité-et-Tobago", "Tunisie", "Turkménistan", "Turquie", "Tuvalu", "Ukraine",
    "Uruguay", "Vanuatu", "Vatican", "Venezuela", "Viêt Nam", "Yémen", "Zambie", "Zimbabwe"
  ];

  villesParPays: { [key: string]: string[] } = {
    Afghanistan: ["Kaboul", "Kandahar"],
    "Afrique du Sud": ["Le Cap", "Johannesbourg"],
    Albanie: ["Tirana", "Durrës"],
    Algérie: ["Alger", "Oran"],
    Allemagne: ["Berlin", "Munich"],
    Andorre: ["Andorre-la-Vieille", "Escaldes-Engordany"],
    Angola: ["Luanda", "Huambo"],
    "Antigua-et-Barbuda": ["Saint John's", "All Saints"],
    "Arabie saoudite": ["Riyad", "Djeddah"],
    Argentine: ["Buenos Aires", "Córdoba"],
    Arménie: ["Erevan", "Gyumri"],
    Australie: ["Sydney", "Melbourne"],
    Autriche: ["Vienne", "Graz"],
    Azerbaïdjan: ["Bakou", "Gandja"],
    Bahamas: ["Nassau", "Freeport"],
    Bahreïn: ["Manama", "Riffa"],
    Bangladesh: ["Dacca", "Chittagong"],
    Barbade: ["Bridgetown", "Speightstown"],
    Belgique: ["Bruxelles", "Anvers"],
    Belize: ["Belmopan", "Belize City"],
    Bénin: ["Porto-Novo", "Cotonou"],
    Bhoutan: ["Thimphou", "Phuntsholing"],
    Biélorussie: ["Minsk", "Gomel"],
    Birmanie: ["Naypyidaw", "Yangon"],
    Bolivie: ["Sucre", "La Paz"],
    "Bosnie-Herzégovine": ["Sarajevo", "Banja Luka"],
    Botswana: ["Gaborone", "Francistown"],
    Brésil: ["Brasília", "São Paulo"],
    Brunei: ["Bandar Seri Begawan", "Kuala Belait"],
    Bulgarie: ["Sofia", "Plovdiv"],
    "Burkina Faso": ["Ouagadougou", "Bobo-Dioulasso"],
    Burundi: ["Gitega", "Bujumbura"],
    Cambodge: ["Phnom Penh", "Siem Reap"],
    Cameroun: ["Yaoundé", "Douala"],
    Canada: ["Ottawa", "Toronto"],
    "Cap-Vert": ["Praia", "Mindelo"],
    "République centrafricaine": ["Bangui", "Bimbo"],
    Chili: ["Santiago", "Valparaíso"],
    Chine: ["Pékin", "Shanghai"],
    Chypre: ["Nicosie", "Limassol"],
    Colombie: ["Bogota", "Medellín"],
    Comores: ["Moroni", "Mutsamudu"],
    "République du Congo": ["Brazzaville", "Pointe-Noire"],
    "République démocratique du Congo": ["Kinshasa", "Lubumbashi"],
    "Corée du Nord": ["Pyongyang", "Hamhung"],
    "Corée du Sud": ["Séoul", "Busan"],
    "Costa Rica": ["San José", "Alajuela"],
    "Côte d'Ivoire": ["Yamoussoukro", "Abidjan"],
    Croatie: ["Zagreb", "Split"],
    Cuba: ["La Havane", "Santiago de Cuba"],
    Danemark: ["Copenhague", "Aarhus"],
    Djibouti: ["Djibouti", "Ali Sabieh"],
    Dominique: ["Roseau", "Portsmouth"],
    Égypte: ["Le Caire", "Alexandrie"],
    "Émirats arabes unis": ["Abou Dabi", "Dubaï"],
    Équateur: ["Quito", "Guayaquil"],
    Érythrée: ["Asmara", "Keren"],
    Espagne: ["Madrid", "Barcelone"],
    Estonie: ["Tallinn", "Tartu"],
    Eswatini: ["Mbabane", "Manzini"],
    "États-Unis": ["Washington", "New York"],
    Éthiopie: ["Addis-Abeba", "Dire Dawa"],
    Fidji: ["Suva", "Lautoka"],
    Finlande: ["Helsinki", "Espoo"],
    France: ["Paris", "Marseille"],
    Gabon: ["Libreville", "Port-Gentil"],
    Gambie: ["Banjul", "Serekunda"],
    Géorgie: ["Tbilissi", "Koutaïssi"],
    Ghana: ["Accra", "Kumasi"],
    Grèce: ["Athènes", "Thessalonique"],
    Grenade: ["Saint-Georges", "Gouyave"],
    Guatemala: ["Guatemala City", "Quetzaltenango"],
    Guinée: ["Conakry", "Nzérékoré"],
    "Guinée-Bissau": ["Bissau", "Gabú"],
    "Guinée équatoriale": ["Malabo", "Bata"],
    Guyana: ["Georgetown", "Linden"],
    Haïti: ["Port-au-Prince", "Cap-Haïtien"],
    Honduras: ["Tegucigalpa", "San Pedro Sula"],
    Hongrie: ["Budapest", "Debrecen"],
    Inde: ["New Delhi", "Mumbai"],
    Indonésie: ["Jakarta", "Surabaya"],
    Irak: ["Bagdad", "Bassorah"],
    Iran: ["Téhéran", "Mashhad"],
    Irlande: ["Dublin", "Cork"],
    Islande: ["Reykjavik", "Akureyri"],
    Israël: ["Jérusalem", "Tel Aviv"],
    Italie: ["Rome", "Milan"],
    Jamaïque: ["Kingston", "Montego Bay"],
    Japon: ["Tokyo", "Osaka"],
    Jordanie: ["Amman", "Irbid"],
    Kazakhstan: ["Nour-Soultan", "Almaty"],
    Kenya: ["Nairobi", "Mombasa"],
    Kirghizistan: ["Bichkek", "Och"],
    Kiribati: ["Tarawa", "Betio"],
    Koweït: ["Koweït City", "Al Ahmadi"],
    Laos: ["Vientiane", "Luang Prabang"],
    Lesotho: ["Maseru", "Mafeteng"],
    Lettonie: ["Riga", "Daugavpils"],
    Liban: ["Beyrouth", "Tripoli"],
    Liberia: ["Monrovia", "Gbarnga"],
    Libye: ["Tripoli", "Benghazi"],
    Liechtenstein: ["Vaduz", "Schaan"],
    Lituanie: ["Vilnius", "Kaunas"],
    Luxembourg: ["Luxembourg", "Esch-sur-Alzette"],
    "Macédoine du Nord": ["Skopje", "Bitola"],
    Madagascar: ["Antananarivo", "Toamasina"],
    Malaisie: ["Kuala Lumpur", "George Town"],
    Malawi: ["Lilongwe", "Blantyre"],
    Maldives: ["Malé", "Addu City"],
    Mali: ["Bamako", "Sikasso"],
    Malte: ["La Valette", "Birkirkara"],
    Maroc: ["Rabat", "Casablanca"],
    "Îles Marshall": ["Majuro", "Ebeye"],
    Maurice: ["Port-Louis", "Beau Bassin-Rose Hill"],
    Mauritanie: ["Nouakchott", "Nouadhibou"],
    Mexique: ["Mexico", "Guadalajara"],
    Micronésie: ["Palikir", "Weno"],
    Moldavie: ["Chișinău", "Tiraspol"],
    Monaco: ["Monaco", "Monte-Carlo"],
    Mongolie: ["Oulan-Bator", "Erdenet"],
    Monténégro: ["Podgorica", "Nikšić"],
    Mozambique: ["Maputo", "Matola"],
    Namibie: ["Windhoek", "Rundu"],
    Nauru: ["Yaren", "Aiwo"],
    Népal: ["Katmandou", "Pokhara"],
    Nicaragua: ["Managua", "León"],
    Niger: ["Niamey", "Zinder"],
    Nigéria: ["Abuja", "Lagos"],
    Niue: ["Alofi", "Tamakautoga"],
    Norvège: ["Oslo", "Bergen"],
    "Nouvelle-Zélande": ["Wellington", "Auckland"],
    Oman: ["Mascate", "Sohar"],
    Ouganda: ["Kampala", "Gulu"],
    Ouzbékistan: ["Tachkent", "Samarcande"],
    Pakistan: ["Islamabad", "Karachi"],
    Palaos: ["Ngerulmud", "Koror"],
    Palestine: ["Jérusalem-Est", "Gaza"],
    Panama: ["Panama City", "San Miguelito"],
    "Papouasie-Nouvelle-Guinée": ["Port Moresby", "Lae"],
    Paraguay: ["Asunción", "Ciudad del Este"],
    "Pays-Bas": ["Amsterdam", "Rotterdam"],
    Pérou: ["Lima", "Arequipa"],
    Philippines: ["Manille", "Quezon City"],
    Pologne: ["Varsovie", "Cracovie"],
    Portugal: ["Lisbonne", "Porto"],
    Qatar: ["Doha", "Al Rayyan"],
    Roumanie: ["Bucarest", "Cluj-Napoca"],
    "Royaume-Uni": ["Londres", "Birmingham"],
    Russie: ["Moscou", "Saint-Pétersbourg"],
    Rwanda: ["Kigali", "Butare"],
    "Saint-Christophe-et-Niévès": ["Basseterre", "Charlestown"],
    "Sainte-Lucie": ["Castries", "Vieux Fort"],
    "Saint-Marin": ["Saint-Marin", "Serravalle"],
    "Saint-Vincent-et-les-Grenadines": ["Kingstown", "Georgetown"],
    Salomon: ["Honiara", "Auki"],
    Salvador: ["San Salvador", "Santa Ana"],
    Samoa: ["Apia", "Vaitele"],
    "Sao Tomé-et-Principe": ["São Tomé", "Santo António"],
    Sénégal: ["Dakar", "Touba"],
    Serbie: ["Belgrade", "Novi Sad"],
    Seychelles: ["Victoria", "Anse Boileau"],
    "Sierra Leone": ["Freetown", "Bo"],
    Singapour: ["Singapour", "Jurong East"],
    Slovaquie: ["Bratislava", "Košice"],
    Slovénie: ["Ljubljana", "Maribor"],
    Somalie: ["Mogadiscio", "Hargeisa"],
    Soudan: ["Khartoum", "Omdurman"],
    "Soudan du Sud": ["Djouba", "Wau"],
    "Sri Lanka": ["Colombo", "Kandy"],
    Suède: ["Stockholm", "Göteborg"],
    Suisse: ["Berne", "Zurich"],
    Suriname: ["Paramaribo", "Lelydorp"],
    Syrie: ["Damas", "Alep"],
    Tadjikistan: ["Douchanbé", "Khujand"],
    Tanzanie: ["Dodoma", "Dar es Salaam"],
    Tchad: ["N'Djaména", "Moundou"],
    "République tchèque": ["Prague", "Brno"],
    Thaïlande: ["Bangkok", "Nonthaburi"],
    "Timor oriental": ["Dili", "Baucau"],
    Togo: ["Lomé", "Sokodé"],
    Tonga: ["Nuku'alofa", "Neiafu"],
    "Trinité-et-Tobago": ["Port-d'Espagne", "San Fernando"],
    Tunisie: ["Tunis", "Sfax"],
    Turkménistan: ["Achgabat", "Türkmenabat"],
    Turquie: ["Ankara", "Istanbul"],
    Tuvalu: ["Funafuti", "Vaiaku"],
    Ukraine: ["Kiev", "Kharkiv"],
    Uruguay: ["Montevideo", "Salto"],
    Vanuatu: ["Port-Vila", "Luganville"],
    Vatican: ["Cité du Vatican", "Castel Gandolfo"],
    Venezuela: ["Caracas", "Maracaibo"],
    "Viêt Nam": ["Hanoï", "Hô-Chi-Minh-Ville"],
    Yémen: ["Sanaa", "Aden"],
    Zambie: ["Lusaka", "Kitwe"],
    Zimbabwe: ["Harare", "Bulawayo"]
  };

  codesPostauxParVille: { [key: string]: string[] } = {
    Tunis: ["1000", "1001", "1002"],
    Sfax: ["3000", "3001", "3002"],
    Sousse: ["4000", "4001", "4002"],
    Paris: ["75001", "75002", "75003"],
    Marseille: ["13001", "13002", "13003"],
    Lyon: ["69001", "69002", "69003"],
    Toronto: ["M5H", "M5V", "M5A"],
    Vancouver: ["V6A", "V6B", "V6C"],
    Montréal: ["H2Y", "H2X", "H2Z"]
    // Ajoutez d'autres codes postaux selon vos besoins
  };

  selectedPays: string = '';
  selectedVille: string = '';
  villes: string[] = [];
  codesPostaux: string[] = [];

  updateVilles() {
    this.villes = this.villesParPays[this.selectedPays] || [];
    this.codesPostaux = [];
  }

  updateCodesPostaux() {
    this.codesPostaux = this.codesPostauxParVille[this.selectedVille] || [];
  }

saveChanges() {
    // Implement save logic
    console.log('Saving changes...');
  }

  
  resetForm() {
    // Implement reset logic
    console.log('Resetting form...');
  }


  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.user.avatar = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }
  uploadNewAvatar() {
    // Implement avatar upload logic
    console.log('Uploading new avatar...');
  }
}