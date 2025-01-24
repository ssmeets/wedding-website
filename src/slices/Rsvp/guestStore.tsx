import { create } from "zustand"
import { devtools } from "zustand/middleware";
//import { PersistStorage, devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { Item, Locales } from "./translation";


// Interfaces
export interface RSVPObject {
    id: string;
    name: string;
    attending: string;
    email?: string;
    party?: string;
    events?: (Item & Locales)[];
    food?: string;
    allergy?: string;
    allergytext?: string;
    song?: string;
    created?: string;
    agent?: string;
    ipaddress?: string;
}

export interface ResponseInvitationObject {
    results: InvitationObject[];
}

export interface InvitationObject {
    id: string;
    Name: string;
    Search: string;
    Amount: string;
}

export interface RSVPCreationObject {
    orgin: InvitationObject;
    email: string;
    guests: RSVPObject[];
}


interface GuestState {

    rsvp: RSVPCreationObject;
    guests: RSVPObject[];

    addGuest: (guest: RSVPObject) => void;
    reset: () => void;
    setEmail: (value: string) => void;
    setComing: (guest: RSVPObject, value: string) => void;
    setFullname: (guest: RSVPObject, value: string) => void;
    setFood: (guest: RSVPObject, value: string) => void;
    setAllergy: (guest: RSVPObject, value: string) => void;
    setParty: (guest: RSVPObject, value: string) => void;
    setDietary: (guest: RSVPObject, value: string) => void;
    setSelectedEvent: (guest: RSVPObject, value: (Item & Locales)[]) => void;
    setSong: (guest: RSVPObject, value: string) => void;
}


export const useGuestStore = create<GuestState>()(
    devtools(
        immer(
            //            persist(
            (set) => ({
                rsvp: { orgin: { id: "", Name: "", Search: "", Amount: "" }, email: "", guests: [] },
                guests: [],
                addGuest: (guest: RSVPObject) => set((state) => {
                    state.guests.push(guest);
                }),
                reset: () => set((state) => {
                    state.guests = [];
                }),
                setEmail: (value: string) => set((state) => {
                    state.rsvp.email = value;
                }),
                setComing: (guest: RSVPObject, value: string) => set((state) => {
                    const g = state.guests.find((g) => g.id === guest.id);
                    (g) && (g.attending = value);
                }),
                setFullname: (guest: RSVPObject, value: string) => set((state) => {
                    const g = state.guests.find((g) => g.id === guest.id);
                    (g) && (g.name = value);
                }),
                setFood: (guest: RSVPObject, value: string) => set((state) => {
                    const g = state.guests.find((g) => g.id === guest.id);
                    (g) && (g.food = value);
                }),
                setAllergy: (guest: RSVPObject, value: string) => set((state) => {
                    const g = state.guests.find((g) => g.id === guest.id);
                    (g) && (g.allergy = value);
                }),
                setParty: (guest: RSVPObject, value: string) => set((state) => {
                    const g = state.guests.find((g) => g.id === guest.id);
                    (g) && (g.party = value);
                }),
                setDietary: (guest: RSVPObject, value: string) => set((state) => {
                    const g = state.guests.find((g) => g.id === guest.id);
                    (g) && (g.allergytext = value);
                }),
                setSelectedEvent: (guest: RSVPObject, value: (Item & Locales)[]) => set((state) => {
                    const g = state.guests.find((g) => g.id === guest.id);
                    (g) && (g.events = value);
                }),
                setSong: (guest: RSVPObject, value: string) => set((state) => {
                    const g = state.guests.find((g) => g.id === guest.id);
                    (g) && (g.song = value)
                }),
            })

            // {
            //     name: 'information-storage', // name of the item in the storage (must be unique)
            //     storage: storage, // (optional) by default, 'localStorage' is used
            //     version: 1
            // },
            //)
        )
    )
)