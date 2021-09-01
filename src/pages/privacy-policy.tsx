import React from "react"
import styled from "styled-components"

import Layout from "../components/Layout/layout"
import SEO from "../components/Seo/seo"

const StyledParagraph = styled.p`
  text-align: justify;
  margin-top: 12px;
  margin-bottom: 12px;
`
const NumericOl = styled.ol`
  text-align: justify;
  margin-top: 12px;
  margin-bottom: 12px;
  list-style: decimal;
`
const LetterOl = styled.ol`
  list-style: lower-alpha;
`
const RomanOl = styled.ol`
  list-style: lower-roman;
`
const StyledLi = styled.li`
  text-align: justify;
`
const StyledTd = styled.td`
  border: 1px solid black;
`
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`

const Content = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 60%;
`

const PrivacyPolicy = ({ location }) => (
  <Layout>
    <SEO title="Topic-view" />
    <Wrapper>
      <Content>
        <Wrapper>
          <h1>PRIVACY</h1>
        </Wrapper>
        <StyledParagraph>
          Šis dokumentas (toliau – Politika) apibūdina pagrindinius principus,
          remiantis kuriais letaspelnas.lt (toliau – Projektas) saugo ir naudoja
          informaciją, asmens, nuasmenintus ir kitus duomenis, dokumentus
          (toliau – Informacija) ir kaip šiame tinklapyje naudojami slapukai.
        </StyledParagraph>
        <NumericOl>
          <li>
            <strong>Tvarkomų duomenų apimtis</strong>
            <LetterOl>
              <StyledLi>
                Projektas tvarko tik tą Informaciją, kuri yra būtina tvarkyti,
                siekiant užtikrinti sklandžią ir nepertraukiamą Projekto veiklą,
                dalykinių santykių vykdymą.
              </StyledLi>
              <StyledLi>
                Kiekvieno duomenų subjekto tvarkomų duomenų apimtį apibrėžia
                Lietuvos Respublikos įstatymai bei Europos Sąjungos direktyvos.
              </StyledLi>
              <StyledLi>
                Tvarkomų duomenų apimtis visuomet yra susieta su tų duomenų
                tvarkymo tikslais.
              </StyledLi>
              <StyledLi>
                Tvarkomų duomenų apimtis gali keistis, keičiantis duomenų
                tvarkymo tikslams bei galiojantiems teisės aktams.
              </StyledLi>
            </LetterOl>
          </li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li>
            <strong>slapukai</strong>
          </li>
        </NumericOl>
        <table>
          <tbody>
            <tr>
              <StyledTd>
                <strong>Slapuko pavadinimas </strong>
              </StyledTd>
              <StyledTd>
                <strong>Slapuko paskirtis </strong>
              </StyledTd>
              <StyledTd>
                <strong>Sukūrimo laikas </strong>
              </StyledTd>
              <StyledTd>
                <strong>Galiojimo laikas </strong>
              </StyledTd>
              <StyledTd>
                <strong>Naudojami duomenys </strong>
              </StyledTd>
              <StyledTd>
                <strong>Savininkas </strong>
              </StyledTd>
            </tr>
            <tr>
              <td>_ga</td>
              <td>Statistinė informacija</td>
              <td>Apsilankius projekte</td>
              <td>24 mėn.</td>
              <td>IP adresas ir unikalus ID numeris.</td>
              <td>.cloudinary.com</td>
            </tr>
            <tr>
              <td>io</td>
              <td></td>
              <td>Apsilankius projekte</td>
              <td>Apsilankymo metu</td>
              <td></td>
              <td>Mūsų projektas</td>
            </tr>
            <tr>
              <td>financeCookiesAgree</td>
              <td>Slapukų sutikimas</td>
              <td>Apsilankius projekte</td>
              <td>24 mėn.</td>
              <td>Sutikimas dėl slapukų</td>
              <td>Mūsų projekta</td>
            </tr>
          </tbody>
        </table>
      </Content>
    </Wrapper>
  </Layout>
)

export default PrivacyPolicy
