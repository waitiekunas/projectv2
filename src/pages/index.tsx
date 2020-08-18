import React, { useCallback, useEffect, useState } from 'react';
import { connect } from 'react-redux';

import Image from '../components/Image/Image';
import Layout from '../components/Layout/layout';
import SEO from '../components/Seo/seo';
import ClassListFullContent from '../containers/ClassListFullContent/ClassListFullContent';
import { CookiesCont } from '../containers/CookiesCont/CookiesCont';
import { Languages } from '../enums/languages/languages';
import { getLanguage } from '../state/actions/lang';

type MyProps = {
  language: Languages
  dispatch: any
}

export const IndexPage = (props: MyProps) => {
  const [language, setLanguage] = useState<Languages>()
  const [showCookies, setShowCookies] = useState<boolean>(true)
  useEffect(() => {
    setLanguage(props.language)
    setShowCookies(findCookie())
  }, [])
  const handleCookieClick = useCallback(() => {
    setShowCookies(false)
  }, [showCookies])
  const findCookie = () => {
    if (localStorage.getItem("financeCookiesAgree") === "true") {
      return false
    }
    return true
  }
  return (
    <Layout>
      <SEO title="Home" />
      <Image
        imageUri={"/images/index-photo.jpg"}
        imgHeader={"Fact:"}
        imgText={
          "Size of the box and qtty of boxes as well as position can be adjusted"
        }
        showText={true}
        additionalClass={"max-height-40-proc"}
      />
      <ClassListFullContent />
      {showCookies && (
        <CookiesCont language={language} handleClick={handleCookieClick} />
      )}
    </Layout>
  )
}

const mapDispatchToProps = dispatch => {
  return dispatch(getLanguage(Languages.LITHUANIA))
}
const mapStateToProps = state => ({
  language: state.language.language,
})
export default connect(mapStateToProps, mapDispatchToProps)(IndexPage)
