"use client";
import { Content, RichTextField } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { Button, Input, Listbox, ListboxButton, ListboxOption, ListboxOptions, Menu, MenuButton, MenuItem, MenuItems, Select } from "@headlessui/react";
import { useMemo, useRef, useState } from "react";
import axios from "axios";
import Bounded from "@/components/Bounded";
import RsvpInput from "./FormComponents/RsvpInput";
import RsvpSelect from "./FormComponents/RsvpSelect";
import RsvpListBox from "./FormComponents/RsvpListBox";
import RsvpTextArea from "./FormComponents/RsvpTextArea";
import {
  allergies,
  comings,
  createRSVPBtn,
  dietaryPlaceholder,
  emailPlaceholder,
  events,
  findInvitation,
  foods,
  guestPlaceholder,
  invitationPlaceholder,
  Item,
  Locales,
  namePlaceholder,
  parties,
  songNamePlaceholder,
  submit,
  warning_messages,
} from "./translation";
import { getInvitation, getIpadress, postRSVP, validate } from "./formManagement";
import BarLoader from "react-spinners/BarLoader";
import RsvpRadio from "./FormComponents/RsvpRadio";
import { InvitationObject, RSVPCreationObject, useGuestStore } from "./guestStore";
import Guests from "./Guests";
import { MdOutlineCancelPresentation } from "react-icons/md";
import gsap from "gsap";

/**
 * Props for `Rsvp`.
 */
export type RsvpProps = SliceComponentProps<Content.RsvpSlice>;

/**
 * Component for "Rsvp" Slices.
 */
const Rsvp = ({ slice, context }: RsvpProps): JSX.Element => {
  context = "en";

  const [invitationSearch, setInvitationSearch] = useState("");
  const [foundInvitation, setFoundInvitation] = useState<InvitationObject[] | null>(null);
  const [findingInvitation, setFindingInvitation] = useState(false);
  const [invitation, setInvitation] = useState<InvitationObject>();
  const [showRsvp, setShowRsvp] = useState(false);

  const [success, setSuccess] = useState(false);
  const [finished, setFinished] = useState(false);
  const [validated, setValidated] = useState(true);
  const [validationMessages, setValidationMessags] = useState([""]);
  const [posting, setPosting] = useState(false);

  const mainRef = useRef<HTMLDivElement>(null);
  const rsvpRef = useRef<HTMLDivElement>(null);

  const { addGuest, reset, setEmail, setOrigin, rsvp } = useGuestStore();

  const animateRSVP = () => {
    const tl = gsap.timeline({ defaults: { ease: "power2.inOut" } });
    if (mainRef.current) {
      console.log(mainRef.current.getBoundingClientRect());
      const height = mainRef.current.getBoundingClientRect().height;
      tl.fromTo(rsvpRef.current, { y: 0 }, { y: -height, duration: 0.5 });
      tl.fromTo(mainRef.current, { opacity: 1 }, { opacity: 0, duration: 1 });
    }
  };

  const createRSVP = async () => {
    animateRSVP();
    reset();
    let gs = invitation?.Name.split("&");
    setOrigin(invitation?.id || "");
    const amount = parseInt(invitation?.Amount || "2");
    if (gs && gs.length < amount) {
      const len = gs.length;
      for (let i = 1; i < amount - len + 1; i++) {
        gs?.push(guestPlaceholder[context as "en" | "nl" | "pt"] + i);
      }
    }
    console.log(rsvp);
    gs?.map((g, i) => {
      addGuest({
        id: Math.random().toString(16).slice(2),
        name: g.trim(),
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
        ipaddress: "",
      });
    });
    console.log("====");
    console.log(rsvp);
    setShowRsvp(true);
  };

  const closeRsvp = () => {
    setValidationMessags([]);
    setValidated(true);
    setSuccess(false);
    setShowRsvp(false);
    const tl = gsap.timeline({ defaults: { ease: "power2.inOut" } });
    tl.fromTo(mainRef.current, { opacity: 0 }, { opacity: 1, duration: 1 });
  };

  const exexutePost = async () => {
    setOrigin(invitation?.id || "");
    setValidationMessags([]);
    // setValidated(true);
    let val = validate(rsvp, context as "en" | "nl" | "pt", setValidationMessags, setValidated);
    console.log(val);
    if (val) {
      postRSVP(rsvp, setSuccess, setFinished);
    }
  };

  const parsedContent = (part: RichTextField) => {
    return part?.map((block, index) => {
      switch (block.type) {
        case "preformatted":
          return getDropDownMenu(block.text || "");
        case "paragraph":
          return <span id={"block" + index}>{block.text}</span>;
        default:
          return null;
      }
    });
  };

  const getDropDownMenu = (text: string) => {
    switch (text) {
      case "email":
        return <RsvpInput key="email" setFunction={setEmail} value={rsvp.email} placeholder={emailPlaceholder[context as "en" | "nl" | "pt"]} />;
      default:
        return <p>|{text}|</p>;
    }
  };

  const lookupInvotations = async () => {
    setValidationMessags([]);
    setFindingInvitation(true);
    setFoundInvitation(null);
    const m = [];
    let val = true;
    if (invitationSearch.length < 2) {
      val = false;
      m.push(warning_messages["noinvitation"][context as "en" | "nl" | "pt"]);
    }
    if (val) {
      getInvitation(invitationSearch, m, context as "en" | "nl" | "pt", setFoundInvitation, setFindingInvitation, setValidated, setInvitation);
    } else {
      setValidationMessags(m);
      setValidated(val);
    }
  };

  return (
    <section id="rsvp" className="min-h-screen" data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
      <Bounded>
        <h1 className="text-center font-curly text-8xl md:text-9xl">RSVP</h1>
        <h2 className="text-center font-content text-2xl md:text-3xl">{slice.primary.deadline}</h2>
        <br />

        {/* Invitation lookup */}
        <div ref={mainRef}>
          <div className="block text-center font-content text-2xl md:text-3xl leading-10">
            <PrismicRichText field={slice.primary.invitation_lookup} />
            <br />
            <RsvpInput key="invitation" setFunction={setInvitationSearch} value={invitationSearch} placeholder={invitationPlaceholder[context as "en" | "nl" | "pt"]} />
            <br />
            <br />
            <Button onClick={lookupInvotations} className="font-content bg-white border-[1px] border-black md:border-0 md:bg-black py-2 px-4 text-sm text-neutral-700 md:text-white uppercase data-[hover]:bg-gray-600 data-[active]:bg-gray-700">
              {findInvitation[context as "en" | "nl" | "pt"]}
            </Button>
          </div>

          {/* Invitation selection */}
          <div className="block text-center font-content pt-8 text-2xl md:text-3xl leading-10">
            <BarLoader loading={findingInvitation} className="m-auto" />
            {foundInvitation &&
              (foundInvitation.length > 0 ? (
                <>
                  {" "}
                  {<PrismicRichText field={slice.primary.invitation_checkboxes} />} <br />
                  {<RsvpRadio key="name" setFunction={setInvitation} value={invitation} items={foundInvitation} context={context as "en" | "nl" | "pt"} />}
                  <br />
                  <Button onClick={createRSVP} className="font-content bg-white border-[1px] border-black md:border-0 md:bg-black py-2 px-4 text-sm text-neutral-700 md:text-white uppercase data-[hover]:bg-gray-600 data-[active]:bg-gray-700">
                    {createRSVPBtn[context as "en" | "nl" | "pt"]}
                  </Button>
                </>
              ) : (
                <p>{warning_messages["noinvitation"][context as "en" | "nl" | "pt"]}</p>
              ))}
          </div>
        </div>
        {/* RSVP creation */}
        <div ref={rsvpRef}>
          {showRsvp && (
            <div className="relative mt-8 shadow-2xl z-50 before:h-full before:w-full before:content-[''] before:-z-10 before:absolute after:h-full after:w-full after:content-[''] before:bg-gray-100 before:shadow-xl before:-left-2 before:-rotate-2 after:-z-10 after:absolute after:bg-gray-100 after:shadow-xl after:-right-1 after:-bottom-1 after:rotate-2">
              <div className="block text-center font-content text-xl md:text-2xl leading-10 bg-white">
                <div className="float-right cursor-pointer text-right pt-2 pr-2">
                  <MdOutlineCancelPresentation onClick={() => closeRsvp()} />
                </div>
                <div className="font-curly text-7xl pt-2">RSVP</div>
                <div className="p-3">{parsedContent(slice.primary.email_input)}</div>
                <br />
                <Guests context={context as "en" | "nl" | "pt"} slice={slice}></Guests>
                <br />
                <div>{slice.primary.closing_line}</div>
                <Button onClick={exexutePost} className="font-content bg-white border-[1px] border-black md:border-0 md:bg-black py-2 px-4 text-sm text-neutral-700 md:text-white uppercase data-[hover]:bg-gray-600 data-[active]:bg-gray-700">
                  {submit[context as "en" | "nl" | "pt"]}
                </Button>
                <br />
                <br />
                {!validated && (
                  <div className="bg-orange-100 border-2 border-orange-500 text-orange-700 m-auto w-11/12 font-sans text-base" role="alert">
                    <h1 className="font-bold">{warning_messages["notsent"][context as "en" | "nl" | "pt"]}</h1>
                    <ul>
                      {validationMessages.map((message) => (
                        <li>{message}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {success && (
                  <div className="bg-green-100 border-2 border-green-500 text-green-700 m-auto w-11/12 font-sans text-base" role="alert">
                    <h1 className="font-bold">{warning_messages["sent"][context as "en" | "nl" | "pt"]}</h1>
                  </div>
                )}
                <br />
              </div>
            </div>
          )}
        </div>
      </Bounded>
    </section>
  );
};

export default Rsvp;
