import React, { useState } from "react";
import { Content, RichTextField } from "@prismicio/client";
import { useGuestStore } from "./guestStore";
import GuestManagement from "./GuestManagement";
import { BiChevronUpSquare } from "react-icons/bi";
import { guestPlaceholder } from "./translation";
import { FiChevronUp } from "react-icons/fi";

export default function Guests({ context, slice }: { context: string; slice: Content.RsvpSlice }) {
  const { rsvp } = useGuestStore();
  const [open, setOpen] = useState("");

  return (
    <>
      <div className="block text-center font-content text-xl md:text-2xl leading-10 [overflow-anchor:none]">
        {rsvp.guests.map((guest, index) => {
          const [isOpen, setIsOpen] = useState(false);

          return (
            <div key={guest.id} className={`group ${isOpen ? "open" : ""}`} id={guest.id}>
              <button onClick={() => setIsOpen(!isOpen)} className="flex justify-between bg-black/10 w-full">
                <div className="p-2 text-left">{guest.name || guestPlaceholder[context as "en" | "nl" | "pt"]}</div>
                <div>
                  <FiChevronUp className={`transform duration-1000 ease-in-out ${isOpen ? "rotate-180" : ""} text-4xl pl-1 pr-1`} />
                </div>
              </button>
              <div className={`overflow-hidden transition-all duration-1000 ease-[cubic-bezier(0.95,0.05,0.795,0.035)] ${isOpen ? "scale-100 text-black max-h-max visible opacity-100" : "max-h-0 invisible opacity-0"}`}>
                <GuestManagement key={index} guest={guest} context={context} slice={slice} />
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
