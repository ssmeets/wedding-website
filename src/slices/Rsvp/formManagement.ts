import axios from "axios";
import { warning_messages } from "./translation";
import { InvitationObject, ResponseInvitationObject, RSVPCreationObject, RSVPObject } from "./guestStore";

//API calls
export const getIpadress = async () => {
  const res = await axios.get("https://api.ipify.org/?format=json");
  return res.data.ip;
};

export interface PostRSVPData {
  email: string;
  name: string;
}

export const getInvitation = (
  search: string,
  m: string[],
  context: string,
  setFoundInvitation: (v: InvitationObject[]) => void,
  setFindingInvitation: (p: boolean) => void,
  setValidated: (p: boolean) => void,
  setInvitation: (v: InvitationObject) => void
) => {
  const config = {
    headers: {
      Authorization: "Token 6UQnp2sja2BMzumRzgyIbtwv41LJjwfo",
    },
    params: {
      user_field_names: true,
      search: search,
    },
  };

  axios
    .get<ResponseInvitationObject>(`https://api.baserow.io/api/database/rows/table/431760/`, config)
    .then(function (response) {
      setFoundInvitation(response.data.results);
      setFindingInvitation(false);
      setInvitation(response.data.results[0]);
    })
    .catch(function (error) {
      m.push(warning_messages["error_finding_invitation"][context as "en" | "nl" | "pt"]); // handle error
      setValidated(false);
    });
};

export const postRSVP = async (rsvp: RSVPCreationObject, setSuccess: (bool: boolean) => void, setFinished: (bool: boolean) => void, setError: (bool: boolean) => void) => {
  const ipaddress = await getIpadress();

  const config = {
    headers: {
      Authorization: "Token lQwcxBlIvMmGVBTxG16xJAJm44rV2kYN",
    },
  };

  const data = {
    items: rsvp.guests.map((guest) => {
      const ev = (guest.events ?? []).map((event) => event.name);
      if (guest.attending === "notattending") {
        return {
          name: guest.name,
          email: rsvp.email,
          origin: rsvp.orgin,
          attending: guest.attending,
          ipaddress: ipaddress,
          agent: navigator.userAgent,
          created: new Date().toISOString(),
        };
      } else {
        return {
          name: guest.name,
          email: rsvp.email,
          origin: rsvp.orgin,
          attending: guest.attending,
          events: ev,
          allergytext: guest.allergytext,
          allergy: guest.allergy,
          song: guest.song,
          //food: guest.food,
          ipaddress: ipaddress,
          agent: navigator.userAgent,
          created: new Date().toISOString(),
        };
      }
    }),
  };

  let attempts = 0;
  let success = false;
  let lastError = null;

  while (attempts < 3 && !success) {
    try {
      const response = await axios.post(`https://api.baserow.io/api/database/rows/table/426293/batch/?user_field_names=true`, data, config);
      // handle success
      setSuccess(true);
      sendEmail(rsvp);
      console.log("Response:", response);
      success = true;
    } catch (error) {
      attempts++;
      lastError = error;
      console.log(`Attempt ${attempts} failed:`, error);
      if (attempts < 3) {
        console.log("Retrying...");
        await new Promise((resolve) => setTimeout(resolve, 500));
      }
    }
  }

  if (!success) {
    setSuccess(false);
    console.log("All attempts failed:", lastError);
    setError(true);
  }

  setFinished(true);
};

const sendEmail = async (rsvp: RSVPCreationObject) => {
  const data: PostRSVPData = { email: rsvp.email, name: rsvp.guests.map((guest) => guest.name).join(", ") };

  //console.log(data);
  axios
    .post(`/api/rsvp`, data)
    .then(function (response) {
      // handle success
      console.log(response);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .finally(function () {
      // always executed
    });
};

//Validation
export const validate = (rsvp: RSVPCreationObject, context: string, setValidationMessags: (messages: string[]) => void, setValidated: (val: boolean) => void) => {
  let val = true;
  let m: string[] = [];
  rsvp.email == "" && (m.push(warning_messages["noemail"][context as "en" | "nl" | "pt"]), (val = false));
  rsvp.email != "" && validateEmail(rsvp.email) === null && (m.push(warning_messages["emailformat"][context as "en" | "nl" | "pt"]), (val = false));
  rsvp.guests.map((guest) => {
    const name = guest.name;
    name == "" && (m.push(warning_messages["noname"][context as "en" | "nl" | "pt"]), (val = false));
    if (name != "") {
      guest.attending == "attending" && guest.events?.length === 0 && (m.push(name + " - " + warning_messages["noevent"][context as "en" | "nl" | "pt"]), (val = false));
      guest.allergy == "allergy" && guest.allergytext === "" && (m.push(name + " - " + warning_messages["noallergy"][context as "en" | "nl" | "pt"]), (val = false));
    }
  });

  setValidationMessags(m);
  setValidated(val);
  return val;
};

export const validateEmail = (email: string) => {
  return String(email)
    .toLowerCase()
    .match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
};
