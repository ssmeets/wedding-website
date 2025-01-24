"use client"
import { Content, RichTextField } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { Button, Input, Listbox, ListboxButton, ListboxOption, ListboxOptions, Menu, MenuButton, MenuItem, MenuItems, Select } from "@headlessui/react";
import { useMemo, useState } from "react";
import axios from 'axios';
import Bounded from "@/components/Bounded";
import RsvpInput from "./FormComponents/RsvpInput";
import RsvpSelect from "./FormComponents/RsvpSelect";
import RsvpListBox from "./FormComponents/RsvpListBox";
import RsvpTextArea from "./FormComponents/RsvpTextArea";
import { allergies, comings, createRSVPBtn, dietaryPlaceholder, emailPlaceholder, events, findInvitation, foods, guestPlaceholder, invitationPlaceholder, Item, Locales, namePlaceholder, parties, songNamePlaceholder, submit, warning_messages } from "./translation";
import { getInvitation, getIpadress } from "./formManagement";
import BarLoader from "react-spinners/BarLoader";
import RsvpRadio from "./FormComponents/RsvpRadio";
import { InvitationObject, RSVPCreationObject, useGuestStore } from "./guestStore";
import Guests from "./Guests";


/**
 * Props for `Rsvp`.
 */
export type RsvpProps = SliceComponentProps<Content.RsvpSlice>;

/**
 * Component for "Rsvp" Slices.
 */
const Rsvp = ({ slice, context }: RsvpProps): JSX.Element => {
  context = 'en';

  const [invitationSearch, setInvitationSearch] = useState("")
  const [foundInvitation, setFoundInvitation] = useState<InvitationObject[] | null>(null)
  const [findingInvitation, setFindingInvitation] = useState(false)
  const [invitation, setInvitation] = useState<InvitationObject>()
  const [showRsvp, setShowRsvp] = useState(false)

  const [success, setSuccess] = useState(false)
  const [finished, setFinished] = useState(false)
  const [validated, setValidated] = useState(true)
  const [validationMessages, setValidationMessags] = useState([""])
  const [posting, setPosting] = useState(false)


  const { addGuest, reset } = useGuestStore();


  const getGuests = async () => {
    // const guests = [];
    // let gs = invitation?.Name.split("&")
    // const amount = parseInt(invitation?.Amount || "2")
    // const ipaddress = await getIpadress();
    // (gs && gs.length > amount) && gs.push("")

    // gs?.map((g, i) => {
    //   guests.push({
    //     name: g,
    //     attending: coming,
    //     email: email,
    //     party: party,
    //     events: selectedEvent.map((e) => e.id),
    //     food: food,
    //     allergy: allergy,
    //     allergytext: allergy == "allergy" ? dietary : "",
    //     song: song,
    //     created: new Date().toISOString(),
    //     agent: navigator.userAgent,
    //     ipaddress: ipaddress
    //   })
    // })
  }

  const createRSVP = async () => {
    reset();
    let gs = invitation?.Name.split("&")
    const amount = parseInt(invitation?.Amount || "2");
    if (gs && gs.length < amount) {
      const len = gs.length
      for (let i = 1; i < (amount - len + 1); i++) {
        gs?.push(guestPlaceholder[context as 'en' | 'nl' | 'pt'] + i)
      }
    }
    gs?.map((g, i) => {
      addGuest({
        id: Math.random().toString(16).slice(2),
        name: g,
        attending: "attending",
        email: "",
        party: "alone",
        events: [],
        food: "chicken",
        allergy: "noallergy",
        allergytext: "",
        song: "",
        created: new Date().toISOString(),
        agent: navigator.userAgent,
        ipaddress: ""
      })
    })
    setShowRsvp(true)

  }

  const exexutePost = async () => {
    // setValidationMessags([])
    setValidated(true)
    //validate()
  }

  const lookupInvotations = async () => {
    setValidationMessags([])
    setFindingInvitation(true)
    setFoundInvitation(null)
    const m = [];
    let val = true;
    if (invitationSearch.length < 2) {
      val = false;
      m.push(warning_messages["noinvitation"][context as 'en' | 'nl' | 'pt']);
    }
    if (val) {

      getInvitation(invitationSearch, m, context as 'en' | 'nl' | 'pt',
        setFoundInvitation,
        setFindingInvitation,
        setValidated,
        setInvitation
      )
    } else {
      setValidationMessags(m);
      setValidated(val);
    }
  }

  return (
    <section id="rsvp"
      className="min-h-screen"
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <Bounded>
        <h1 className="text-center font-curly text-8xl md:text-9xl">RSVP</h1>
        <h2 className="text-center font-content text-2xl md:text-3xl">{slice.primary.deadline}</h2><br />

        {/* Invitation lookup */}
        <div className="block text-center font-content text-2xl md:text-3xl leading-10">
          <PrismicRichText field={slice.primary.invitation_lookup} /><br />
          <RsvpInput key='invitation' setFunction={setInvitationSearch} value={invitationSearch} placeholder={invitationPlaceholder[context as 'en' | 'nl' | 'pt']} />
          <br /><br />
          <Button onClick={lookupInvotations} className="font-content bg-white border-[1px] border-black md:border-0 md:bg-black py-2 px-4 text-sm text-black md:text-white uppercase data-[hover]:bg-gray-600 data-[active]:bg-gray-700">
            {findInvitation[context as 'en' | 'nl' | 'pt']}
          </Button>
        </div>

        {/* Invitation selection */}
        <div className="block text-center font-content pt-8 text-2xl md:text-3xl leading-10">
          <BarLoader loading={findingInvitation} className="m-auto" />
          {foundInvitation &&
            (foundInvitation.length > 0
              ? (<> {<PrismicRichText field={slice.primary.invitation_checkboxes} />} <br />
                {<RsvpRadio key='name' setFunction={setInvitation} value={invitation} items={foundInvitation} context={context as 'en' | 'nl' | 'pt'} />}
                <br />
                <Button onClick={createRSVP} className="font-content bg-white border-[1px] border-black md:border-0 md:bg-black py-2 px-4 text-sm text-black md:text-white uppercase data-[hover]:bg-gray-600 data-[active]:bg-gray-700">
                  {createRSVPBtn[context as 'en' | 'nl' | 'pt']}
                </Button>
              </>)
              : (<p>{warning_messages["noinvitation"][context as 'en' | 'nl' | 'pt']}</p>)
            )
          }

        </div>

        {/* RSVP creation */}
        {showRsvp && (
          <div className="border-[1px] border-black mt-8 w-full">
            <div className="block text-center font-content text-xl md:text-2xl leading-10">
              {/* {parsedContent(slice.primary.email_input)}<br /> */}
              <Guests context={context as 'en' | 'nl' | 'pt'} slice={slice}></Guests>
            </div>
          </div>
        )}

        {/* <br /><Button onClick={exexutePost} className="font-content bg-white border-[1px] border-black md:border-0 md:bg-black py-2 px-4 text-sm text-black md:text-white uppercase data-[hover]:bg-gray-600 data-[active]:bg-gray-700">
          {submit[context as 'en' | 'nl' | 'pt']}
        </Button><br /> */}
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
