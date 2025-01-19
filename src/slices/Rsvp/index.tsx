"use client"
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { Button, Input, Listbox, ListboxButton, ListboxOption, ListboxOptions, Menu, MenuButton, MenuItem, MenuItems, Select } from "@headlessui/react";
import { useMemo, useState } from "react";
import axios from 'axios';
import Bounded from "@/components/Bounded";
import RsvpInput from "./FormComponents/RsvpInput";
import RsvpSelect from "./FormComponents/RsvpSelect";
import RsvpListBox from "./FormComponents/RsvpListBox";
import RsvpTextArea from "./FormComponents/RsvpTextArea";

export type Locales = {
  en: string,
  nl: string,
  pt: string
}

export type Item = {
  id: number,
  name: string
}

const foods: (Item & Locales)[] = [
  { id: 1, name: 'chicken', en: "Chicken", nl: "Kip", pt: "Frango" },
  { id: 2, name: 'steak', en: "Steak", nl: "Bief", pt: "Bife" },
  { id: 3, name: 'fish', en: "Fish", nl: "Vis", pt: "Peixe" },
  { id: 4, name: 'vegetarian', en: "Vegetarian", nl: "Vegetarisch", pt: "Vegetariano" },
]

const comings: (Item & Locales)[] = [
  { id: 1, name: 'attending', en: "am attending", nl: "Kom", pt: "Participo" },
  { id: 2, name: 'notattending', en: "am not attending", nl: "Kom niet", pt: "Não participo" }
]

const allergies: (Item & Locales)[] = [
  { id: 1, name: 'noallergy', en: "Do not", nl: "Niet allergisch", pt: "Não slergia" },
  { id: 2, name: 'allergy', en: "Do", nl: "Allergisch", pt: "Alergia" },
]

const events: (Item & Locales)[] = [
  { id: 1, name: 'friday', en: "Friday evening drinks", nl: "Vrijdagavond borrel", pt: "Sexta-feira drinks" },
  { id: 2, name: 'reception', en: "Saturday reception", nl: "Zaterdag receptie", pt: "Recepção de sábado" },
  { id: 3, name: 'dinner', en: "Saturday Dinner", nl: "Zaterdag diner", pt: "Jantar de sábado" },
  { id: 4, name: 'party', en: "Saturday Party", nl: "Zaterdag feest", pt: "Festa de sábado" }
]

const parties: (Item & Locales)[] = [
  { id: 1, name: 'alone', en: "Alone", nl: "Alleen", pt: "Sozinho" },
  { id: 2, name: 'plusone', en: "Bringing a date", nl: "Ik neem een date mee", pt: "Levando uma data" },
  { id: 3, name: 'family', en: "Would like to bring my kids", nl: "Ik zou graag mijn kinderen brengen", pt: "Gostaria de trazer meus filhos" },
]

const namePlaceholder: Locales = {
  en: "your name here",
  nl: "uw volledige naam hier",
  pt: "nome completo aqui"
}

const emailPlaceholder: Locales = {
  en: "email",
  nl: "e-mail",
  pt: "e-mail"
}

const songNamePlaceholder: Locales = {
  en: "song name",
  nl: "naam van het liedje",
  pt: "nome da música"
}

const dietaryPlaceholder: Locales = {
  en: "please explain the dietary restrictions",
  nl: "leg alstublieft de dieetbeperkingen uit",
  pt: "por favor, explique as restrições dietéticas"
}

const submit: Locales = {
  en: "Send",
  nl: "Verstuur",
  pt: "Enviar"
}

type WarningMessages = {
  [key: string]: {
    en: string;
    nl: string;
    pt: string;
  };
};

const warning_messages: WarningMessages = {
  'sent': { en: "RSVP has been sent. Thank you!", nl: "RSVP is verzonden. Dank u!", pt: "RSVP foi enviado. Obrigado!" },
  'notsent': { en: "RSVP has not been sent", nl: "RSVP is niet verzonden", pt: "RSVP não foi enviado" },
  'noname': { en: "Please enter your name", nl: "Voer uw naam in", pt: "Por favor, insira seu nome" },
  'noemail': { en: "Please enter your email", nl: "Voer uw e-mailadres in", pt: "Por favor, insira seu e-mail" },
  'emailformat': { en: "Please enter a valid email", nl: "Voer een geldig e-mailadres in", pt: "Por favor, insira um e-mail válido" },
  'noevent': { en: "Please select at least one event", nl: "Selecteer minimaal één evenement", pt: "Selecione pelo menos um evento" },
  'noallergy': { en: "Please specify the dietary restrictions", nl: "Geef de dieetbeperkingen op", pt: "Especifique as restrições dietéticas" },
}


interface RSVPObject {
  name: string,
  attending: string,
  email?: string,
  party?: string,
  events?: string[],
  food?: string,
  allergy?: string,
  allergytext?: string,
  song?: string,
  created: string,
  agent: string,
  ipaddress: string
}

/**
 * Props for `Rsvp`.
 */
export type RsvpProps = SliceComponentProps<Content.RsvpSlice>;

/**
 * Component for "Rsvp" Slices.
 */
const Rsvp = ({ slice, context }: RsvpProps): JSX.Element => {
  const [selectedEvent, setSelectedEvent] = useState<(Item & Locales)[]>([])
  const [fullname, setFullname] = useState("")
  const [email, setEmail] = useState("")
  const [song, setSong] = useState("")
  const [party, setParty] = useState("alone")
  const [coming, setComing] = useState("attending")
  const [allergy, setAllergy] = useState("noallergy")
  const [food, setFood] = useState("chicken")
  const [dietary, setDietary] = useState("")
  const [success, setSuccess] = useState(true)
  const [finished, setFinished] = useState(false)
  const [validated, setValidated] = useState(true)
  const [validationMessages, setValidationMessags] = useState([""])
  const [posting, setPosting] = useState(false)


  const postRSVP = (data: RSVPObject) => {

    const config = {
      headers: {
        "Authorization": "Token lQwcxBlIvMmGVBTxG16xJAJm44rV2kYN"
      }
    }

    axios.post(`https://api.baserow.io/api/database/rows/table/426293/?user_field_names=true`, data, config)
      .then(function (response) {
        // handle success
        setSuccess(true)
        setFinished(true)
        console.log(response);
      })
      .catch(function (error) {
        // handle error
        setSuccess(false)
        setFinished(true)
        console.log(error);
      })
      .finally(function () {
        // always executed
      });
  }

  const validate = async () => {
    console.log("validating")
    const m = []
    let val = true

    if (coming == "attending") {
      console.log("attending")
      if (fullname == "") {
        val = false
        m.push(warning_messages["noname"][context as 'en' | 'nl' | 'pt'])
      }
      if (email == "") {
        val = false
        m.push(warning_messages["noemail"][context as 'en' | 'nl' | 'pt'])
      } else {
        if (!validateEmail(email)) {
          val = false
          m.push(warning_messages["emailformat"][context as 'en' | 'nl' | 'pt'])
        }
      }

      if (allergy == "allergy" && dietary == "") {
        val = false
        m.push(warning_messages["noallergy"][context as 'en' | 'nl' | 'pt'])
      }

      if (selectedEvent.length == 0) {
        val = false
        m.push(warning_messages["noevent"][context as 'en' | 'nl' | 'pt'])
      }
    } else {
      console.log("not attending")
      if (fullname == "") {
        val = false
        m.push(warning_messages["noname"][context as 'en' | 'nl' | 'pt'])
      }
    }

    if (val) {
      const res = await axios.get("https://api.ipify.org/?format=json");
      if (coming == "attending") {
        const data: RSVPObject = {
          name: fullname,
          attending: coming,
          email: email,
          party: party,
          events: selectedEvent.map((event) => event.name),
          food: food,
          allergy: allergy,
          allergytext: dietary,
          song: song,
          created: new Date().toISOString(),
          agent: window.navigator.userAgent.toString(),
          ipaddress: res.data.ip
        }
        postRSVP(data)
        console.log(data)
      } else {
        const data: RSVPObject = {
          name: fullname,
          attending: coming,
          created: new Date().toISOString(),
          agent: window.navigator.userAgent.toString(),
          ipaddress: res.data.ip
        }
        postRSVP(data)
        console.log(data)
      }
    } else {

      setValidationMessags(m)
      setValidated(val)
      console.log(val, posting)
    }
  }



  const validateEmail = (email: string) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const exexutePost = async () => {
    // setValidationMessags([])
    setValidated(true)
    validate()
  }

  const showAll = (index: number) => {
    return (coming == "attending" || (index < 3))
  }

  const getDropDownMenu = (text: string) => {

    switch (text) {
      case 'name':
        return (<RsvpInput key='name' setFunction={setFullname} value={fullname} placeholder={namePlaceholder[context as 'en' | 'nl' | 'pt']} />);
      case 'email':
        return (<RsvpInput key='email' setFunction={setEmail} value={email} placeholder={emailPlaceholder[context as 'en' | 'nl' | 'pt']} />);
      case 'coming':
        return (<RsvpSelect key='coming' setFunction={setComing} value={coming} items={comings} context={context as 'en' | 'nl' | 'pt'} />)
      case 'food':
        return (<RsvpSelect key='food' setFunction={setFood} value={food} items={foods} context={context as 'en' | 'nl' | 'pt'} />)
      case 'allergy':
        return (<RsvpSelect key='allergy' setFunction={setAllergy} value={allergy} items={allergies} context={context as 'en' | 'nl' | 'pt'} />)
      case 'party':
        return (<RsvpSelect key='party' setFunction={setParty} value={party} items={parties} context={context as 'en' | 'nl' | 'pt'} />);
      case 'dietary':
        return (allergy == "allergy") && (<><RsvpTextArea key='dietary' setFunction={setDietary} value={dietary} placeholder={dietaryPlaceholder[context as 'en' | 'nl' | 'pt']} /><br /><br /></>);
      case 'event':
        return (
          <RsvpListBox key='event' setFunction={setSelectedEvent} items={events} value={selectedEvent} context={context as 'en' | 'nl' | 'pt'} />
        );
      case 'song':
        return (<RsvpInput key='song' setFunction={setSong} value={song} placeholder={songNamePlaceholder[context as 'en' | 'nl' | 'pt']} />);
      default:
        return (<p>|{text}|</p>);
    }
  }

  const parsedContent = () => {
    return slice.primary.rsvp_text?.map((block, index) => {
      switch (block.type) {
        case "preformatted":
          return (showAll(index)) && getDropDownMenu(block.text || "");
        case "paragraph":
          return (showAll(index)) && block.text?.includes(".") ? (
            <>
              <span id={"block" + index}>{block.text}</span>
              <br /><br />
            </>
          ) : (
            (showAll(index)) && <span id={"block" + index}>{block.text}</span>
          );
        default:
          if ('text' in block) {
            return (showAll(index)) && <p key={"block" + index}>{block.text}</p>;
          }
          return null;
      }
    });
  };


  return (
    <section id="rsvp"
      className="min-h-screen"
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <Bounded>
        {slice.primary.deadline}
        <div className="block text-center font-content text-4xl leading-10">
          {parsedContent()}
        </div>
        <br /><Button onClick={exexutePost} className="font-content bg-black py-2 px-4 text-sm text-white uppercase data-[hover]:bg-gray-600 data-[active]:bg-gray-700">
          {submit[context as 'en' | 'nl' | 'pt']}
        </Button><br />
        {(!validated) && (<div className="bg-orange-100 border-2 border-orange-500 text-orange-700 w-full p-4" role="alert">
          <h1 className="font-bold">{warning_messages["notsent"][context as 'en' | 'nl' | 'pt']}</h1>
          <ul>
            {validationMessages.map((message) => (
              <li>{message}</li>
            ))}
          </ul>
        </div>)}
        {success && <div className="bg-green-100 border-2 border-green-500 text-green-700 w-full p-4" role="alert">
          <h1 className="font-bold">{warning_messages["sent"][context as 'en' | 'nl' | 'pt']}</h1>
        </div>}

      </Bounded>
    </section>
  );
};

export default Rsvp;
