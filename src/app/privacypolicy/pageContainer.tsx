import React from "react";

import "./styles.scss";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Container } from "react-bootstrap";
import { useTranslation } from "react-i18next";

const PageContainer = () => {
  const { t } = useTranslation();
  return (
    <div>
      <Header />
      <div className="privacy-container">
        <div className="privacy-box1">
          <Container>
            <div className="privacy-text1">{t("Privacy Policy")} </div>
            <div className="privacy-text2">{t("Welcome_to_Connect_At")}</div>
          </Container>
        </div>
        <div className="privacy-box2">
          <Container>
            <span className="privacy-text4">{t("Welcome_to_Connect")}</span>
            <br />
            <div className="privacy-text3">{t("Your_Account_Obligations")}</div>
            <span className="privacy-text5">
              {t("This_Privacy_Policy")}
              <a href="https://prism.com.sa/">www.prism.com.sa</a>
              {t("This_Privacy_Policy_1")}
              <a href="https://prism.com.sa/">www.prism.com.sa</a>
              {t("This_Privacy_Policy_2")}
            </span>
            <br />
            <div className="privacy-text3">{t("Your_Privacy_protection")}</div>
            <span className="privacy-text5">
              <a href="https://prism.com.sa/">www.prism.com.sa</a>&nbsp;
              {t("www_connect_com")}
            </span>
            <br />
            <div className="privacy-text3">{t("Your_Privacy_Guarantee")}</div>
            <span className="privacy-text5">{t("Connect_Promises_not")}</span>
            <br />
            <div className="privacy-text3">
              {t("ThirdParty_Service_Providers")}
            </div>
            <span className="privacy-text5">{t("We_employ")}</span>
            <br />
            <div className="privacy-text3">{t("Information_may_be")}</div>
            <span className="privacy-text5">{t("extra_com_collects_the")}</span>
            <br />
            <div className="privacy-text3">{t("We_may_collect")}</div>
            <div className="privacy-text5">
              &#8226;&nbsp;{t("Name_including_first")}
            </div>
            <br />
            <div className="privacy-text5">
              &#8226;&nbsp;{t("Mobile_phone_number")}
            </div>
            <br />
            <div className="privacy-text5">
              &#8226;&nbsp;{t("Demographic_profile")}
            </div>
            <br />
            <span className="privacy-text5">{t("You_can_terminate")}</span>
            <br />
            <div className="privacy-text3"> {t("Credit_Card_details")} </div>
            <span className="privacy-text5">{t("We_do_not_keep")}</span>
            <br />

            <div className="privacy-text3">
              {t("Our_Use_of_Your_Information")}
            </div>
            <div className="privacy-text3">{t("We_use_your_personal")}</div>
            <div className="privacy-text5">
              &#8226;&nbsp;{t("Get_in_touch_with_you")}
            </div>
            <br />
            <div className="privacy-text5">
              &#8226;&nbsp;{t("Supply_the_orders")}
            </div>
            <br />
            <div className="privacy-text5">
              &#8226;&nbsp;{t("Preserve_social_history")}
            </div>
            <br />
            <div className="privacy-text5">
              &#8226;&nbsp;{t("Contact_you_as_a")}
            </div>
            <br />
            <div className="privacy-text5">
              &#8226;&nbsp;{t("Notify_you_if_you_win")}
            </div>
            <br />
            <div className="privacy-text">
              &#8226;&nbsp;{t("Send_you_promotional")}
            </div>
            <br />
            <div className="privacy-text3">
              {t("Who_allowed_to_use_connect")}
            </div>
            <span className="privacy-text5">
              <a href="https://prism.com.sa/">www.prism.com.sa</a>
              {t("www_connect_com_sa_does")}&nbsp;
              <a href="https://prism.com.sa/">www.prism.com.sa</a>
              {t("www_connect_com_sa_does_1")}
            </span>
            <br />
            <div className="privacy-text3">{t("Information_that_you_can")}</div>
            <span className="privacy-text5">
              <a href="https://prism.com.sa/">www.prism.com.sa</a>
              {t("www_connect_com_sa_gives")}
            </span>
            <br />
            <div className="privacy-text3">{t("Our_Disclosure_of_Your")}</div>
            <span className="privacy-text5">{t("We_will_not_useyour")}</span>
            <div className="privacy-text5">
              &#8226;&nbsp;{t("We_have_your_permission")}
            </div>
            <br />
            <div className="privacy-text5">
              &#8226;&nbsp;{t("To_provide_products_or")}
            </div>
            <br />
            <div className="privacy-text5">
              &#8226;&nbsp;{t("To_help_investigate")}
            </div>
            <br />
            <div className="privacy-text5">
              &#8226;&nbsp;{t("Special_circumstances")}
            </div>
            <div className="privacy-text3">{t("What_choices_are")}</div>
            <div className="privacy-text5">{t("Supplying_personally")}</div>
            <div className="privacy-text3">{t("Security")}</div>
            <div className="privacy-text5">{t("To_protect_against_the")}</div>
            <div className="privacy-text3">{t("Access_or_change")}</div>
            <div className="privacy-text5">
              {t("To_protect_your_privacy")}
              <a href="https://prism.com.sa/">www.prism.com.sa</a>&nbsp;
              {t("To_protect_your_privacy_1")}
            </div>
            <br />
            <div className="privacy-text5">
              {t("You_are_can")}{" "}
              <a
                href="https://www.extra.com/en-sa/contactus"
                target="_blank"
                rel="noopener noreferrer"
              >
                Contact Us
              </a>
              &nbsp;section.
            </div>
            <br />
            <div className="privacy-text5">
              {t("You_can_contact")}
              Phone: <a href="tel:011 462 4477">011 462 4477</a>, E-mail:{" "}
              <a href="mailto:info@prismwll.com">info@prismwll.com</a>,
              info@prismwll.com , Mail: Prism Networks Trading co. (Customer
              Relationship), PO Box 12211 , Al Olaya, Riyadh, Kingdom of Saudi
              Arabia.
            </div>
            <br />
            <div className="privacy-text5">{t("You_will_be_able")}</div>
          </Container>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PageContainer;
