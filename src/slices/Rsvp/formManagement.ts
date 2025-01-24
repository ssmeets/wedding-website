import axios from "axios";
import { warning_messages } from "./translation";
import { InvitationObject, ResponseInvitationObject, RSVPObject } from "./guestStore";

//API calls
export const getIpadress = async () => {
  const res = await axios.get("https://api.ipify.org/?format=json");
  return res.data.ip;
};

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

export const postRSVP = (data: RSVPObject, setSuccess: (bool: boolean) => void, setFinished: (bool: boolean) => void) => {
  const config = {
    headers: {
      Authorization: "Token lQwcxBlIvMmGVBTxG16xJAJm44rV2kYN",
    },
  };

  axios
    .post(`https://api.baserow.io/api/database/rows/table/426293/?user_field_names=true`, data, config)
    .then(function (response) {
      // handle success
      setSuccess(true);
      setFinished(true);
      console.log(response);
    })
    .catch(function (error) {
      // handle error
      setSuccess(false);
      setFinished(true);
      console.log(error);
    })
    .finally(function () {
      // always executed
    });
};

//Validation
export const validate = async (coming: string, fullname: string, email: string, allergy: string, dietary: string, selectedEvent: [], context: string) => {
  console.log("validating");
  const m = [];
  let val = true;

  if (coming == "attending") {
    console.log("attending");
    if (fullname == "") {
      val = false;
      m.push(warning_messages["noname"][context as "en" | "nl" | "pt"]);
    }
    if (email == "") {
      val = false;
      m.push(warning_messages["noemail"][context as "en" | "nl" | "pt"]);
    } else {
      if (!validateEmail(email)) {
        val = false;
        m.push(warning_messages["emailformat"][context as "en" | "nl" | "pt"]);
      }
    }

    if (allergy == "allergy" && dietary == "") {
      val = false;
      m.push(warning_messages["noallergy"][context as "en" | "nl" | "pt"]);
    }

    if (selectedEvent.length == 0) {
      val = false;
      m.push(warning_messages["noevent"][context as "en" | "nl" | "pt"]);
    }
  } else {
    console.log("not attending");
    if (fullname == "") {
      val = false;
      m.push(warning_messages["noname"][context as "en" | "nl" | "pt"]);
    }
  }

  //   if (val) {
  //     const res = await axios.get("https://api.ipify.org/?format=json");
  //     if (coming == "attending") {
  //       const data: RSVPObject = {
  //         name: fullname,
  //         attending: coming,
  //         email: email,
  //         party: party,
  //         events: selectedEvent.map((event) => event.name),
  //         food: food,
  //         allergy: allergy,
  //         allergytext: dietary,
  //         song: song,
  //         created: new Date().toISOString(),
  //         agent: window.navigator.userAgent.toString(),
  //         ipaddress: res.data.ip,
  //       };
  //       postRSVP(data);
  //       console.log(data);
  //     } else {
  //       const data: RSVPObject = {
  //         name: fullname,
  //         attending: coming,
  //         created: new Date().toISOString(),
  //         agent: window.navigator.userAgent.toString(),
  //         ipaddress: res.data.ip,
  //       };
  //       postRSVP(data);
  //       console.log(data);
  //     }
  //   } else {
  //     setValidationMessags(m);
  //     setValidated(val);
  //     console.log(val, posting);
  //   }
};

export const validateEmail = (email: string) => {
  return String(email)
    .toLowerCase()
    .match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
};
