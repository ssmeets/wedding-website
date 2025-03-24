import { Content, RichTextField } from "@prismicio/client";
import React from "react";
import { allergies, comings, dietaryPlaceholder, emailPlaceholder, events, foods, Item, Locales, namePlaceholder, songNamePlaceholder } from "./translation";
import RsvpInput from "./FormComponents/RsvpInput";
import RsvpSelect from "./FormComponents/RsvpSelect";
import RsvpListBox from "./FormComponents/RsvpListBox";
import RsvpTextArea from "./FormComponents/RsvpTextArea";
import { RSVPObject, useGuestStore } from "./guestStore";

export default function GuestManagement({ context, guest, slice }: { context: string; guest: RSVPObject; slice: Content.RsvpSlice }) {
  const { setFullname, setComing, setFood, setAllergy, setDietary, setSelectedEvent, setSong } = useGuestStore();

  const handleFullname = (value: string) => {
    setFullname(guest, value);
  };

  const handleComing = (value: string) => {
    setComing(guest, value);
  };

  const handleFood = (value: string) => {
    setFood(guest, value);
  };

  const handleAllergy = (value: string) => {
    setAllergy(guest, value);
  };

  const handleDietary = (value: string) => {
    setDietary(guest, value);
  };

  const handlEvents = (value: (Item & Locales)[]) => {
    setSelectedEvent(guest, value);
  };

  const handleSong = (value: string) => {
    setSong(guest, value);
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
      case "name":
        return <RsvpInput key="name" setFunction={handleFullname} value={guest.name} placeholder={namePlaceholder[context as "en" | "nl" | "pt"]} />;
      case "coming":
        return <RsvpSelect key="coming" setFunction={handleComing} value={guest.attending} items={comings} context={context as "en" | "nl" | "pt"} />;
      case "food":
        return <RsvpSelect key="food" setFunction={handleFood} value={guest.food || ""} items={foods} context={context as "en" | "nl" | "pt"} />;
      case "allergy":
        return <RsvpSelect key="allergy" setFunction={handleAllergy} value={guest.allergy || ""} items={allergies} context={context as "en" | "nl" | "pt"} />;
      case "dietary":
        return (
          guest.allergy == "allergy" && (
            <>
              <RsvpTextArea key="dietary" setFunction={handleDietary} value={guest.allergytext || ""} placeholder={dietaryPlaceholder[context as "en" | "nl" | "pt"]} />
              <br />
            </>
          )
        );
      case "event":
        return <RsvpListBox key="event" setFunction={handlEvents} items={events} value={guest.events || []} context={context as "en" | "nl" | "pt"} />;
      case "song":
        return <RsvpInput key="song" setFunction={handleSong} value={guest.song || ""} placeholder={songNamePlaceholder[context as "en" | "nl" | "pt"]} />;
      default:
        return <p>|{text}|</p>;
    }
  };

  return (
    <div>
      {parsedContent(slice.primary.attending)}
      <br />
      <br />
      {guest.attending != "notattending" && (
        <>
          {parsedContent(slice.primary.events_selection)}
          {/* <br />
          <br />
          {parsedContent(slice.primary.food_selection)} */}
          <br />
          <br />
          {parsedContent(slice.primary.allergy_selection)}
          <br />
          <br />
          {parsedContent(slice.primary.song_suggestion)}
          <br />
          <br />
        </>
      )}
    </div>
  );
}
