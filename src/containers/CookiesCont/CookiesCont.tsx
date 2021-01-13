import { Link } from 'gatsby';
import React from 'react';
import styled from 'styled-components';

import { Button } from '../../components/Button/Button';
import { DEFAULT_BUTTON_CLASSES } from '../../Constants/Constants';
import { Languages } from '../../enums/languages/languages';
import { translations } from '../../resources/translations/translations';
import { Header } from './style';

interface MyProps {
  language: Languages
  handleClick: () => void
}
const StyledParagraph = styled.p`
  font-weight: 700;
`
const TextWrapper = styled.div`
  width: 90%;
  padding-top: 5%;
  padding-right: 5%;
  text-align: justify;
`
const StyledUl = styled.ul`
  list-style: decimal;
`
const ContentWrapper = styled.div`
  display:flex;
  flex-direction:column;
  justify-content:start;
`
const HeaderWrapper = styled.div`
  display:flex;
  justify-content:start;
  padding-top:6px;
  padding-bottom:6px;
`
const CenteredBox = styled.div`
  display:flex;
  justify-content:center;
`
const FlexEndBox = styled.div`
  display:flex;
  justify-content:flex-end;
`
const CenteredBoxLessWidth = styled.div`
  display:flex;
  justify-content:center;
  width:90%;
`
const ButtonWrapper = styled.div`
  width:100%;
  display:flex;
  justify-content:center;
  flex-direction: row;
  padding-top:1.5rem;
`
const Margin1 = styled.div`
  margin:1%;
`
const ButtonBox = styled.div`
  width:35%;
  display:flex;
  justify-content:space-between;
  flex-direction:row;
`
const CookieWrapper = styled.div`
  position:fixed;
  background-color: rgba(0,0,0,0.5);
  width:100%;
  height: 100%;
  top:0%;
  left:0%;
  display:flex;
  justify-content:center;
  flex-direction:column;
`
const CookieContent = styled.div`
  position:relative;
  background-color:aliceblue;
  width:50%;
  height:50%;
  top:0%;
  display:flex;
  justify-content:center;
  flex-direction:row;
  align-self:center;
  overflow:auto;
`
export const CookiesCont = (props: MyProps) => {
  const setAgreeCookie = () => {
    localStorage.setItem("financeCookiesAgree", "true")
    props.handleClick()
  }
  const cookieCont = (lang: Languages) => {
    switch (lang) {
      case "LTU":
        return (
          <ContentWrapper>
            <Header text="Atskleidimas" />
            <HeaderWrapper>
              <StyledParagraph>
                {"SVARBI INFORMACIJA APIE PROJEKTĄ"}
              </StyledParagraph>
            </HeaderWrapper>
            <CenteredBox>
              <TextWrapper>
                <FlexEndBox>
                  <CenteredBoxLessWidth>
                    <StyledUl>
                      <li>
                        {
                          "Projekto tikslas – skaitytojų švietimas. Pateikiama informacija griežtai nėra ir negali būti laikoma investavimo rekomendacija, patarimu dėl konkrečių finansinių priemonių. Visos konkrečios finansinės priemonės yra minimos tik specifiniame kontekste, kurio vienintelis tikslas skaitytojų švietimas."
                        }
                      </li>
                      <li>
                        {
                          "Projekto rengėjai nesiekia gauti ir faktiškai negauna tiesioginės ar netiesioginės finansinės ar kitokios naudos iš skaitytojų ar paslaugų teikėjų. Projektas yra griežtai nekomercinis."
                        }
                      </li>
                      <li>
                        {
                          "Informacija apie investicijas bei sandorius susijusius su konkrečiomis finansinėmis priemonėmis yra pateikiama su uždelsimu, praėjus tam tikram laikotarpiui (ne mažiau nei savaitei) po jų atlikimo. Todėl skaitymo metu visa tinklapyje pateikta informacija apie atliktus sandorius negali būti naudojama sandoriams su tomis pačiomis finansinėmis priemonės informacijos publikavimo metu (ar po jo) sudaryti – rinkos sąlygos bei kontekstas, kuriame buvo atliktas konkretus sandoris, informacijos publikavimo metu jau pasikeitę (galimai iš esmės)."
                        }
                      </li>
                      <li>
                        {
                          "Su investavimu bendrai, bei kiekviena konkrečia finansine priemone atskirai, yra susijusi rizika prarasti dalį ar visus investuotus pinigus. Kiekvienas konkretus produktas (ar finansinė paslauga) turi unikalų rizikos profilį, kuris yra priimtinas tik daliai investuotojų. Kiekvienu atveju šiame tinklapyje aprašomos finansinės priemonės bus tinkamos tik tam tikriems skaitytojams. Tam tikrais atvejais aprašomas sandoris ar finansinė priemonė nebus tinkama nei vienam skaitytojų. Projekto rengėjai neprisiima įsipareigojimo ar atsakomybės nuspręsti, kuri finansinė priemonė ir/ar paslauga gali būti tinkama kažkuriam konkrečiam, visiems ar bet kuriam iš skaitytojų."
                        }
                      </li>
                    </StyledUl>
                  </CenteredBoxLessWidth>
                </FlexEndBox>
              </TextWrapper>
            </CenteredBox>
            <CenteredBox>
              <TextWrapper>
                {
                  "Visais atvejais konkretus finansinis produktas ar paslauga tam tikrai investuotojų grupei gali būti netinkami, o tinkamumas turėtų būti įvertintas ir nustatomas kiekvienam konkrečiam investuotojui, įvertinus jo žinias, patirtį, finansinę padėtį bei investavimo tikslus. Tai gali atlikti tik licencijuotos finansinės institucijos, kaip nurodo Lietuvos Respublikos finansinių priemonių rinkų įstatymas bei kiti Lietuvos Respublikos teisės aktai."
                }
              </TextWrapper>
            </CenteredBox>
            <CenteredBox>
              <TextWrapper>
                <FlexEndBox>
                  <CenteredBoxLessWidth>
                    <StyledUl>
                      <li value={"5"}>
                        {
                          "Lietuvos respublikos teisės aktai draudžia manipuliuoti rinka ir naudotis viešai neatskleista informacija – negalimas klaidinančios, neteisingos ar melagingos informacijos skleidimas, taip siekiant daryti įtaką akcijų kainoms (manipuliavimas rinka). Jei per klaidą ar bendrovei netinkamai atskleidus informaciją žiniasklaidai skaitytojai galimai sužinos per biržą nepaskelbtą informaciją, tai tokia informacija draudžiama naudotis, ją perduoti ar skelbti."
                        }
                      </li>
                    </StyledUl>
                  </CenteredBoxLessWidth>
                </FlexEndBox>
              </TextWrapper>
            </CenteredBox>
            <CenteredBox>
              <TextWrapper>
                {
                  "Šis projektas (toliau – Projektas) bei jame pateikiama informacija yra parengiama bei skelbiama informacijos, turimos šios informacijos paskelbimo dieną, pagrindu. Jeigu aiškiai nenurodyta ir kontekstas nereikalauja kitaip, Projekte pateikta informacija turi būti suprantama kaip atitinkanti faktines aplinkybes informacijos paskelbimo dieną. Dalis informacijos, tai yra informacija apie konkrečius sandorius, visuomet yra pateikiama su uždelsimu. Tokia informacija nėra aktuali ir jos pateikimo dieną, ji yra skirta ir naudojama tik šviečiamaisiais tikslais, edukaciniu pagrindu."
                }
              </TextWrapper>
            </CenteredBox>
            <CenteredBox>
              <TextWrapper>
                {
                  "Projektas bei jame pateikia informacija nėra ir neturi būti laikoma rekomendacija pirkti ar parduoti bet kokias finansines priemones, paslaugas. Priimdami sprendimą sudaryti bet kokį sandorį susijusį su finansų rinkomis ar finansinėmis priemonėmis, skaitytojai privalo vadovautis savo žiniomis, patirtimi, finansine padėtimi. Visus šiuos faktorius bei konkrečių investicinių priemonių ar paslaugų tinkamumą patikrinti bei patvirtinti gali tik licencijuotos finansinės institucijos, kaip nurodo Lietuvos Respublikos finansinių priemonių rinkų įstatymas bei kiti Lietuvos Respublikos teisės aktai, Europos Sąjungos direktyvos. Projekte pateiktas turinys negali būti suprantamas kaip patarimas investicijų, teisės ar mokesčių klausimais. Siekdamas visapusiškai suvokti su investicijomis į bet kokias finansines priemones susijusius privalumus bei rizikas, kiekvienas potencialus investuotojas turėtų kreiptis į savo finansų, teisės, verslo ar mokesčių konsultantus."
                }
              </TextWrapper>
            </CenteredBox>{" "}
            <CenteredBox>
              <TextWrapper>
                {
                  "Skaitytojas neturi ir negali Projekte pateikiamos informacijos naudoti kaip pagrindo sudaryti konkrečius sandorius su konkrečiomis finansinėmis priemonėmis. Projekto rengėjai neprisiima jokios atsakomybės ir neatsako už bet kokius jūsų patirtus nuostolius perkant ir parduodant finansines priemones ir/arba finansines paslaugas. Visus sprendimus, susijusius su investicijomis, turite priimti patys. Net tais atvejais, kai manote, kad vieną ar kitą sprendimą investuoti priimate atsižvelgdami į Projekte pateikiamą medžiagą, tai yra jūsų asmeninis sprendimas už kurį, kaip ir jo tiek tiesiogines, tiek netiesiogines pasekmes, projekto rengėjai neatsako bei jokios atsakomybės neprisiima."
                }
              </TextWrapper>
            </CenteredBox>{" "}
            <CenteredBox>
              <TextWrapper>
                {
                  "Projekte yra pateikiami teiginiai būsimuoju laiku, kurie grindžiami autorių nuomone, lūkesčiais bei prognozėmis dėl ateities įvykių ir finansinių tendencijų. Teiginiai būsimuoju laiku apima informaciją apie galimus ar numanomus įmonių veiklos rezultatus, makroekonominius faktorius, investicijų strategiją, sutartinius santykius, investavimo sąlygas, būsimo reguliavimo poveikį ir kitą informaciją. Teiginiai būsimuoju laiku yra paremti informacija, turima tos informacijos paskelbimo dieną. Projekto rengėjai įsipareigoja viešai patikslinti ar pakeisti šiuos teiginius tik tiek, kiek tai yra reikalaujama pagal įstatymus."
                }
              </TextWrapper>
            </CenteredBox>{" "}
            <CenteredBox>
              <TextWrapper>
                {`Spausdamas “Sutinku”, šio puslapio lankytojas pripažįsta, jog yra tinkamai supažindintas su šiuo įspėjimu ir yra perskaitęs bei sutinka su projekto “Lėtas pelnas” `}{" "}
                <Link to="/privacy-policy">Privatumo politika</Link>
              </TextWrapper>
            </CenteredBox>
            <ButtonWrapper>
              <ButtonBox>
                <Margin1>
                  <Button
                    handleClick={setAgreeCookie}
                    buttonTexts={translations}
                    label={"agree"}
                    language={props.language}
                    classButton={DEFAULT_BUTTON_CLASSES}
                  />
                </Margin1>
                <Margin1>
                  <a href="https://www.google.com" rel="noopener norefferer">
                    <Button
                      handleClick={() => null}
                      buttonTexts={translations}
                      label={"disagree"}
                      language={props.language}
                      classButton={DEFAULT_BUTTON_CLASSES}
                    />
                  </a>
                </Margin1>
              </ButtonBox>
            </ButtonWrapper>
          </ContentWrapper>
        )
      default:
        return <div>TESTT</div>
    }
  }
  return (
    <CookieWrapper>
      <CookieContent>
        {cookieCont(props.language)}
      </CookieContent>
    </CookieWrapper>
  )
}
