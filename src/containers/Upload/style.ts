import { Field, FieldArray } from 'formik';
import styled from 'styled-components';

export const StyledSpan = styled.span`
  padding-left: 0.5rem;
  color: red;
  cursor: pointer;
`
export const StyledFieldArray = styled(FieldArray)`
  display: flex;
  justify-content: center;
  flex-direction: column;
`
export const StyledFileName = styled.div`
  align-self: center;
`
export const BorderedField = styled(Field)`
  border: 1px solid;
`
export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`

export const Content = styled.div`
  width: 90%;
  padding: 5%;
  @media (max-width: 480px) {
    width: 60%;
  }
`
export const SectionWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: row;
  padding: 0.5rem;
  @media (max-width: 480px) {
    flex-direction: column;
  }
`
export const StyledDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-self: center;
  @media (max-width: 480px) {
    width: 30%;
    justify-content: start;
  }
`
export const StyledDivInfo = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-self: center;
  font-size: 16px;
  color: red;
  @media (max-width: 480px) {
    width: 30%;
    justify-content: start;
  }
`
export const InputWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  align-self: center;
  @media (max-width: 480px) {
    width: 70%;
    justify-content: start;
  }
`
export const AttachedFilesWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: row;
  @media (max-width: 480px) {
    flex-direction: column;
  }
`
export const ArrayInputWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  align-self: center;
  flex-direction: column-reverse;
`
export const CustomSectionWrapper = styled.div`
  width: 100%;
  height: 50%;
  display: flex;
  justify-content: center;
  flex-direction: row;
  padding: 0.5rem;
  @media (max-width: 480px) {
    flex-direction: column;
  }
`
export const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: row;
  padding-top: 1.5rem;
`
export const StyledButtonBox = styled.div`
  width: 25%;
`
export const StyledCenterRow = styled.div`
  display: flex;
  justify-content: center;
`
export const StyledColumnContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
`
