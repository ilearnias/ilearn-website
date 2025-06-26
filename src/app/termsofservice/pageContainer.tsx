import React from "react";

import "./styles.scss";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Col, Container, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";

const PageContainer = () => {
  const { t } = useTranslation();
  return (
    <div>
      <Header />
      <div className="terms-container">
        <div className="terms-box1">
          <Container>
            <div className="terms-text1">{t("Terms of Service")}</div>
            <div className="terms-text2">{t("These_Terms_of_Service")}</div>
          </Container>
        </div>

        <div className="terms-box2">
          <Container>
            <span className="terms-text5">{t("Welcome_to")}</span>&nbsp;
            <a href="https://prism.com.sa/">www.prism.com.sa</a>&nbsp;
            <span className="terms-text5">
              {t("Referred_to_as_the_website_online_service")}
            </span>
            <br />
            <br />
            <span className="terms-text5">
              {t("This_website_is_provided_by_PRISM")}
            </span>
            <br />
            <span className="terms-text5">
              {t("Please_read_carefully_before")}
            </span>
            <br />
            <div className="terms-text3">{t("Terms_of_Use")} </div>
            <div className="terms-text5">{t("Use_of_the_website_is")} </div>
            <div className="terms-text5">{t("If_you_are_a_minor")} </div>
            <div className="terms-text5">{t("Those_who_choose_to_acces")} </div>
            <div className="terms-text5">{t("Except_where_additional")} </div>
            <div className="terms-text5">{t("By_using_the")}</div>
            <br />
            <div className="terms-text3">{t("Website_Security")}</div>
            <div className="terms-text5">{t("You_are_prohibited")}</div>
            <div className="terms-text5">{t("Accessing_data_not")}</div>
            <div className="terms-text5">
              &#8226;&nbsp;{t("Attempting_to_probe")}
            </div>
            <div className="terms-text5">
              &#8226;&nbsp;{t("Attempting_to_interfere")}
            </div>
            <div className="terms-text5">
              &#8226;&nbsp;{t("Sending_unsolicited")}
            </div>
            <div className="terms-text5">
              &#8226;&nbsp;{t("Forging_any_TCP_IP")}
            </div>
            <div className="terms-text5">{t("Violations_of")}</div>
            <div className="terms-text5">{t("You_agree_not")}</div>
            <div className="terms-text5">{t("The_website_will")}</div>
            <div className="terms-text3"> {t("Registration_Your_Account")}</div>
            <div className="terms-text5">{t("Registration_includes")}</div>
            <div className="terms-text5">{t("The_details_provided")}</div>
            <div className="terms-text5">{t("The_website_assumes")}</div>
            <div className="terms-text5">{t("A_customer_has")}</div>
            <div className="terms-text5">{t("Customer_can_edit")}</div>
            <div className="terms-text3">{t("Electronic_Communication")}</div>
            <div className="terms-text5">
              {t("As_you_buy_from")}
              <a href="https://prism.com.sa/">www.prism.com.sa</a>
              {t("As_you_buy_from1")}
            </div>
            <div className="terms-text5">
              {t("As_you_use_the")}
              <a href="https://prism.com.sa/">www.prism.com.sa</a>
              {t("As_you_buy_from1")}
            </div>
            <div className="terms-text5">{t("You_agree_that_any")}</div>
            <div className="terms-text5">{t("PRISM_obtains")}</div>
            <div className="terms-text5">
              {t("In_case_you_want")}
              &nbsp;<a href="tel:011 462 4477 ">011 462 4477 </a>
              {t("or_by_filling")}
              &nbsp;
              <a href="https://prism.bairuhatech.com/contact_us">lin0k.</a>
            </div>
            <div className="terms-text5">{t("PRISM_does_not")}</div>
            <div className="terms-text5">{t("We_may_monitor")}</div>
            <div className="terms-text3">{t("Product_Seller_Reviews")}</div>
            <div className="terms-text5">{t("Customers_who_complete")}</div>
            <div className="terms-text3">{t("Products_Information_Stock")}</div>
            <div className="terms-text5">{t("While_the_website_strives")}</div>
            <div className="terms-text5">{t("The_colors_of_our")}</div>
            <div className="terms-text5">{t("Publishing_any_form")}</div>
            <div className="terms-text5">{t("PRISM_reserves")}</div>
            <div className="terms-text5">{t("If_a_product_service")}</div>
            <div className="terms-text5">{t("Still_in_our_effort")}</div>
            <div className="terms-text5">{t("Stock_availability_and")}</div>
            <div className="terms-text5">{t("All_Prices_and_Fees")}</div>
          </Container>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PageContainer;
