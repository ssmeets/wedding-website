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

export type Item = {
  id: number,
  name: string,
  en: string,
  nl: string,
  pt: string
}

const foods: Item[] = [
  { id: 1, name: 'chicken', en: "Chicken", nl: "Kip", pt: "Frango" },
  { id: 2, name: 'steak', en: "Steak", nl: "Bief", pt: "Bife" },
  { id: 3, name: 'fish', en: "Fish", nl: "Vis", pt: "Peixe" },
  { id: 4, name: 'vegetarian', en: "Vegetarian", nl: "Vegetarisch", pt: "Vegetariano" },
]

const comings: Item[] = [
  { id: 1, name: 'attending', en: "Attending", nl: "Kom", pt: "Participo" },
  { id: 2, name: 'notattending', en: "Not attending", nl: "Kom niet", pt: "Não participo" }
]

const allergies: Item[] = [
  { id: 1, name: 'allergy', en: "Allergy", nl: "Allergisch", pt: "Alergia" },
  { id: 2, name: 'noallergy', en: "No Allergy", nl: "Niet allergisch", pt: "Não slergia" }
]

const events: Item[] = [
  { id: 1, name: 'friday', en: "Friday evening drinks", nl: "Vrijdagavond borrel", pt: "Sexta-feira drinks" },
  { id: 2, name: 'reception', en: "Saturday reception", nl: "Zaterdag receptie", pt: "Recepção de sábado" },
  { id: 3, name: 'dinner', en: "Saturday Dinner", nl: "Zaterdag diner", pt: "Jantar de sábado" },
  { id: 4, name: 'party', en: "Saturday Party", nl: "Zaterdag feest", pt: "Festa de sábado" }
]

const parties: Item[] = [
  { id: 1, name: 'alone', en: "Alone", nl: "Alleen", pt: "Sozinho" },
  { id: 2, name: 'plusone', en: "Bringing a date", nl: "Ik neem een date mee", pt: "Levando uma data" },
  { id: 3, name: 'family', en: "Would like to bring my kids", nl: "Ik zou graag mijn kinderen brengen", pt: "Gostaria de trazer meus filhos" },
]


interface RSVPObject {
  name: string,
  party: string,
  events: string[],
  created_at: string,
  agent: string,
  ip: string
}

/**
 * Props for `Rsvp`.
 */
export type RsvpProps = SliceComponentProps<Content.RsvpSlice>;

/**
 * Component for "Rsvp" Slices.
 */
const Rsvp = ({ slice, context }: RsvpProps): JSX.Element => {
  const [selectedEvent, setSelectedEvent] = useState<Item[]>([events[2]])
  const [fullname, setFullname] = useState("")
  const [email, setEmail] = useState("")
  const [song, setSong] = useState("")
  const [party, setParty] = useState("")
  const [coming, setComing] = useState("")
  const [allergy, setAllergy] = useState("")
  const [food, setFood] = useState("")
  const [success, setSuccess] = useState(true)
  const [finished, setFinished] = useState(false)


  const postRSVP = (data: RSVPObject) => {

    const config = {
      headers: {
        "X-Access-Key": "$2a$10$o0rcqiQSfoiYSnYgmLu3iO/1OYsZneLcvsKCZliysvlhz3XKrI9Ni",
        "X-Collection-Id": "67852dcfad19ca34f8ec7e5b"
      }
    }

    axios.post(`https://api.jsonbin.io/v3/b`, data, config)
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

  const exexutePost = async () => {
    const res = await axios.get("https://api.ipify.org/?format=json");
    const data: RSVPObject = {
      name: fullname,
      party: party,
      events: selectedEvent.map((event) => event.name),
      created_at: new Date().toISOString(),
      agent: window.navigator.userAgent.toString(),
      ip: res.data.ip
    }
    console.log(data)
    postRSVP(data)
  }

  const getDropDownMenu = (text: string) => {

    switch (text) {
      case 'name':
        return (<RsvpInput setFunction={setFullname} value={fullname} />);
      case 'email':
        return (<RsvpInput setFunction={setEmail} value={email} />);
      case 'coming':
        return (<RsvpSelect setFunction={setComing} value={coming} items={comings} context={context as 'en' | 'nl' | 'pt'} />)
      case 'food':
        return (<RsvpSelect setFunction={setFood} value={food} items={foods} context={context as 'en' | 'nl' | 'pt'} />)
      case 'allergy':
        return (<RsvpSelect setFunction={setAllergy} value={allergy} items={allergies} context={context as 'en' | 'nl' | 'pt'} />)
      case 'party':
        return (<RsvpSelect setFunction={setParty} value={party} items={parties} context={context as 'en' | 'nl' | 'pt'} />);
      case 'event':
        return (
          <RsvpListBox setFunction={setSelectedEvent} items={events} value={selectedEvent} context={context as 'en' | 'nl' | 'pt'} />
        );
      case 'song':
        return (<RsvpInput setFunction={setSong} value={song} />);
      default:
        return <></>;
    }
  }

  const parsedContent = useMemo(() => {
    return slice.primary.rsvp_text?.map((block) => {
      switch (block.type) {
        case "preformatted":
          return getDropDownMenu(block.text || "");
        case "paragraph":
          return block.text?.includes(".") ? (
            <>
              <span>{block.text}</span>
              <br />
            </>
          ) : (
            <span>{block.text}</span>
          );
        default:
          if ('text' in block) {
            return <p>{block.text}</p>;
          }
          return null;
      }
    });
  }, [slice.primary.rsvp_text, getDropDownMenu]);


  return (
    <section id="rsvp"
      className="min-h-screen"
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <Bounded>
        {slice.primary.deadline}
        <h1>{`Current locale: ${context}`}</h1>
        {parsedContent}
        <Button onClick={exexutePost} className="rounded bg-sky-600 py-2 px-4 text-sm text-white data-[hover]:bg-sky-500 data-[active]:bg-sky-700">
          Save changes
        </Button>
      </Bounded>
    </section>
  );
};

export default Rsvp;
