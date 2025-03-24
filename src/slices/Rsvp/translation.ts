export type Locales = {
  en: string;
  nl: string;
  pt: string;
};

export type Item = {
  id: number;
  name: string;
};

export const foods: (Item & Locales)[] = [
  { id: 1, name: "chicken", en: "Chicken", nl: "Kip", pt: "Frango" },
  { id: 2, name: "steak", en: "Steak", nl: "Bief", pt: "Bife" },
  { id: 3, name: "fish", en: "Fish", nl: "Vis", pt: "Peixe" },
  {
    id: 4,
    name: "vegetarian",
    en: "Vegetarian",
    nl: "Vegetarisch",
    pt: "Vegetariano",
  },
];

export const comings: (Item & Locales)[] = [
  { id: 1, name: "attending", en: "is attending", nl: "Komt", pt: "vai" },
  {
    id: 2,
    name: "notattending",
    en: "is not attending",
    nl: "Komt niet",
    pt: "Não vai",
  },
];

export const allergies: (Item & Locales)[] = [
  {
    id: 1,
    name: "noallergy",
    en: "have no",
    nl: "heb geen",
    pt: "Não tenho",
  },
  { id: 2, name: "allergy", en: "have", nl: "heb", pt: "tenho" },
];

export const events: (Item & Locales)[] = [
  {
    id: 1,
    name: "friday",
    en: "Friday evening drinks",
    nl: "Vrijdagavond borrel",
    pt: "Festa de Boas-Vindas de Sexta-feira",
  },
  {
    id: 2,
    name: "reception",
    en: "Saturday reception",
    nl: "Zaterdag receptie",
    pt: "Cerimonia de Casamento de Sábado",
  },
  {
    id: 3,
    name: "party",
    en: "Saturday Party",
    nl: "Zaterdag feest",
    pt: "Festa de sábado",
  },
];

export const parties: (Item & Locales)[] = [
  { id: 1, name: "alone", en: "Alone", nl: "Alleen", pt: "Sozinho" },
  {
    id: 2,
    name: "plusone",
    en: "Bringing a date",
    nl: "Ik neem een date mee",
    pt: "Levando uma data",
  },
  // { id: 3, name: 'family', en: "Would like to bring my kids", nl: "Ik zou graag mijn kinderen brengen", pt: "Gostaria de trazer meus filhos" },
];

export const invitationPlaceholder: Locales = {
  en: "your name",
  nl: "uw naam",
  pt: "nome aqui",
};

export const namePlaceholder: Locales = {
  en: "name here",
  nl: "volledige naam hier",
  pt: "nome completo aqui",
};

export const guestPlaceholder: Locales = {
  en: "Guest",
  nl: "Gast",
  pt: "Convidado",
};

export const emailPlaceholder: Locales = {
  en: "email",
  nl: "e-mail",
  pt: "e-mail",
};

export const songNamePlaceholder: Locales = {
  en: "song name",
  nl: "naam van het liedje",
  pt: "nome da música",
};

export const dietaryPlaceholder: Locales = {
  en: "please explain the dietary restrictions",
  nl: "leg alstublieft de dieetwensen uit",
  pt: "por favor, explique as restrições dietéticas",
};

//Buttons
export const createRSVPBtn: Locales = {
  en: "Create RSVP",
  nl: "Genereer RSVP",
  pt: "Criar RSVP",
};

export const findInvitation: Locales = {
  en: "Find invitation",
  nl: "Zoek uitnodiging",
  pt: "Encontrar convite",
};

export const submit: Locales = {
  en: "Send",
  nl: "Verstuur",
  pt: "Enviar",
};

export const moreinfo: Locales = {
  en: "More info",
  nl: "Meer informatie",
  pt: "Mais informações",
};

//Warning messages
export type WarningMessages = {
  [key: string]: {
    en: string;
    nl: string;
    pt: string;
  };
};

export const error_messages: WarningMessages = {
  sent: {
    en: "An error occurred while sending the RSVP. Please try again.",
    nl: "Er is een fout opgetreden bij het verzenden van de RSVP. Probeer het opnieuw.",
    pt: "Ocorreu um erro ao enviar o RSVP. Tente novamente.",
  },
};

export const warning_messages: WarningMessages = {
  sent: {
    en: "RSVP has been sent. Thank you!",
    nl: "RSVP is verzonden. Dank u!",
    pt: "RSVP foi enviado. Obrigado!",
  },
  notsent: {
    en: "RSVP has not been sent",
    nl: "RSVP is niet verzonden",
    pt: "RSVP não foi enviado",
  },
  noname: {
    en: "Please enter a name for one of the guests",
    nl: "Voer een naam in voor een van de gasten",
    pt: "Por favor, insira um nome para um dos convidados",
  },
  noemail: {
    en: "Please enter an email",
    nl: "Voer een e-mailadres in",
    pt: "Por favor, insira e-mail",
  },
  emailformat: {
    en: "Please enter a valid email",
    nl: "Voer een geldig e-mailadres in",
    pt: "Por favor, insira um e-mail válido",
  },
  noevent: {
    en: "Please select at least one event",
    nl: "Selecteer minimaal één evenement",
    pt: "Selecione pelo menos um evento",
  },
  noallergy: {
    en: "Please specify the dietary restrictions",
    nl: "Geef de dieetbeperkingen op",
    pt: "Especifique as restrições alimentares",
  },
  noinvitation: {
    en: "No invitation found",
    nl: "Geen uitnodiging gevonden",
    pt: "Nenhum convite encontrado",
  },
  error_finding_invitation: {
    en: "Something went wrong in finding the invitation",
    nl: "Er is iets misgegaan bij het vinden van de uitnodiging",
    pt: "Algo deu errado ao encontrar o convite",
  },
};
