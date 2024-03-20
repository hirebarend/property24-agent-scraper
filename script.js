console.log(
  document.querySelector(".p24_listing")
    ? document.querySelector(".p24_listing").getAttribute("data-listingnumber")
    : ""
);

const interval = setInterval(async () => {
  const agency = document.querySelector(
    "#p24_listingAgency .p24_listingCard .p24_agencyLogoName span"
  )
    ? document.querySelector(
        "#p24_listingAgency .p24_listingCard .p24_agencyLogoName span"
      ).innerHTML
    : "";

  const listingContactDetails = document.querySelectorAll(
    "ul.p24_listingContactDetails"
  );

  if (!listingContactDetails) {
    return;
  }

  for (const listingContactDetail of [...listingContactDetails]) {
    const name = listingContactDetail.querySelector(
      "li.js-P24_AgentName.p24_AgentName span"
    )
      ? listingContactDetail.querySelector(
          "li.js-P24_AgentName.p24_AgentName span"
        ).innerHTML
      : "";

    const elements = listingContactDetail.querySelectorAll(
      "li.p24_mobileNumberLink span.p24_sidebarAgentContactNumber"
    );

    for (const element of [...elements]) {
      const mobileNumber = element.innerHTML.replace(/\s/g, "");

      console.log(`[${name}] - ${mobileNumber}`);

      await fetch("https://api.airtable.com/v0/appLkn2CIAFLMgmRS/Contacts", {
        body: JSON.stringify({
          records: [
            {
              fields: {
                Agency: agency,
                "Mobile Number": mobileNumber,
                Name: name,
              },
            },
          ],
        }),
        headers: {
          Authorization: `Bearer <TOKEN>`,
          "Content-Type": "application/json",
        },
        method: "POST",
      });
    }

    clearInterval(interval);
  }
}, 1000);
