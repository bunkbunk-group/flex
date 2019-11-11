import styled from '@emotion/styled';
import React from 'react';
import { Formik, Form, Field } from 'formik';
import { FormattedMessage } from '../../util/reactIntl';

const Input = ({ name, label }) => (
  <div>
    <label>{label}</label>
    <Field name={name} />
  </div>
);

const SectionTitle = styled.h3`
  /* Font */
  color: #b2b2b2;

  margin-top: 0;
  margin-bottom: 12px;
  padding-top: 3px;
  padding-bottom: 3px;

  @media (min-width: 768px) {
    margin-top: 0;
    margin-bottom: 24px;
    padding-top: 4px;
    padding-bottom: 4px;
  }
`;

// const CustomContainer = () => styled.div`
//   padding: 0;
//   margin-bottom: 36px;

//   @media (min-width: 768px) {
//     padding: 0;
//     margin-bottom: 56px;
//   }
// `;

const SocialMediaField = ({ handleSubmit, ...rest }) => (
  <div style={{ padding: '0', marginBottom: '56px' }}>
    <Formik {...rest}>
      <Form>
        <SectionTitle>
          <FormattedMessage id="ProfileSettingsForm.socialMedia" />
        </SectionTitle>
        {/* <Input type="text" id="firstName" name="firstName" label="FirstName" /> */}
        {/* <Input type="text" id="lastName" name="lastName" label="LastName" /> */}
        {/* <Input type="textarea" id="bio" name="bio" label="Bio" /> */}
        <Input type="text" id="facebookUrl" name="facebookUrl" label="Facebook" />
        <Input type="text" id="instagramUrl" name="instagramUrl" label="Instagram" />
        <Input
          type="text"
          id="whyImOnbunkbunk"
          name="whyImOnbunkbunk"
          label="Why I'm on bunkbunk"
        />
        <Input type="text" id="myMotto" name="myMotto" label="My motto" />
        {/* <button type="submit">Submit</button> */}
      </Form>
    </Formik>
  </div>
);

export default SocialMediaField;
