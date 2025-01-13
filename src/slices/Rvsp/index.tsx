'use client'
import Bounded from "@/components/Bounded";
import { Button, Input, Listbox, ListboxButton, ListboxOption, ListboxOptions, Menu, MenuButton, MenuItem, MenuItems, Select } from "@headlessui/react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import axios from 'axios';

import { useParams } from 'next/navigation'
import { Fragment, useState } from "react";
import { IoIosCheckmark } from "react-icons/io";
import { IoChevronDownCircleOutline } from "react-icons/io5";

const events = [
  { id: 1, name: 'friday', 'en-us': "Friday evening drinks", 'nl-nl': "Vrijdagavond borrel" },
  { id: 2, name: 'reception', 'en-us': "Saturday reception", 'nl-nl': "Zaterdag receptie" },
  { id: 3, name: 'dinner', 'en-us': "Saturday Dinner", 'nl-nl': "Zaterdag diner" },
  { id: 4, name: 'party', 'en-us': "Saturday Party", 'nl-nl': "Zaterdag feest" }
]

const parties = [
  { id: 1, name: 'alone', 'en-us': "Alone", 'nl-nl': "Alleen" },
  { id: 2, name: 'plusone', 'en-us': "Bringing a date", 'nl-nl': "Ik neem een date mee" },
  { id: 3, name: 'family', 'en-us': "Would like to bring my kids", 'nl-nl': "Ik zou graag mijn kinderen brengen" }
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
 * Props for `Rvsp`.
 */
export type RvspProps = SliceComponentProps<Content.RvspSlice>;

/**
 * Component for "Rvsp" Slices.
 */
const Rvsp = ({ slice, context }: RvspProps): JSX.Element => {

  const [selectedEvent, setSelectedEvent] = useState<{ id: number, name: string }[]>([events[2]])
  const [fullname, setFullname] = useState("")
  const [party, setParty] = useState("")
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
        return (<Input name="name" type="text" onChange={(e) => setFullname(e.target.value)} value={fullname} />);
      case 'party':
        return (<Select name="party" onChange={(e) => setParty(e.target.value)}>
          {parties.map((party) => (
            <option value={party.name}>{party[context as 'en-us' | 'nl-nl']}</option>
          ))}
        </Select>);
      case 'event':
        console.log("bla")
        return (
          <Listbox value={selectedEvent} onChange={setSelectedEvent} multiple>
            <ListboxButton>{events[0][context as 'en-us' | 'nl-nl']}</ListboxButton>
            <ListboxOptions anchor="bottom">
              {events.map((event) => (
                <ListboxOption key={event.id} value={event} className="data-[focus]:bg-blue-900">
                  {event[context as 'en-us' | 'nl-nl']}
                </ListboxOption>
              ))}
            </ListboxOptions>
          </Listbox>
        );
      default:
        return <></>;
    }
  }

  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      {slice.primary.deadline}
      <h1>{`Current locale: ${context}`}</h1>
      <PrismicRichText field={slice.primary.rvsp_text}
        components={{
          preformatted: ({ text }) => (
            getDropDownMenu(text || "")
          )
        }}
      />
      <Button onClick={exexutePost} className="rounded bg-sky-600 py-2 px-4 text-sm text-white data-[hover]:bg-sky-500 data-[active]:bg-sky-700">
        Save changes
      </Button>
    </Bounded>
  );
};

export default Rvsp;
