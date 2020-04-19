import React, { useReducer, FormEvent, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

import {
  Container,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  InputGroupAddon,
  FormFeedback,
  InputGroup,
  Row,
} from 'reactstrap';

import { quoteReducer, quoteInitialState } from '../../reducer/quote';
import { FETCH_SUCCESS, FETCH_ERROR, SET_LOADING, SET_REQUIRED_AMOUNT } from '../../reducer/app';
import { validateInput } from '../../formValidate';

import { QuoteObject } from '../../model';
import { GlobalContext } from '../../context';

import './Quote.scss';

const Quote = () => {
  const [state, disptach] = useReducer(quoteReducer, quoteInitialState);
  const appContext = useContext(GlobalContext);
  const history = useHistory();

  const handleOnChange = (evt: any) => {
    const { name, value } = evt.target;
    const result = validateInput(evt);

    disptach({
      type: 'SET_STATE',
      payload: {
        name,
        value,
        valid: result.valid,
        touched: true,
        errorMessage: result.message,
      },
    });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const { amount, fromCurrency, toCurrency } = state;

    appContext.dispatch({
      type: SET_LOADING,
      payload: {},
    });

    appContext.dispatch({
      type: SET_REQUIRED_AMOUNT,
      payload: {
        amount: state.amount.value,
        fromCurrency: fromCurrency.value,
        toCurrency: toCurrency.value,
      },
    });

    axios
      .get<QuoteObject>(
        `https://api.ofx.com/PublicSite.ApiService/OFX/spotrate/Individual/${fromCurrency.value}/${toCurrency.value}/${amount.value}?format=json`,
      )
      .then((response) => {
        appContext.dispatch({
          type: FETCH_SUCCESS,
          payload: { quotes: response.data },
        });
        history.push('/result');
      })
      .catch((error) =>
        appContext.dispatch({ type: FETCH_ERROR, payload: { quotes: {}, error: error } }),
      );
  };

  const {
    firstName,
    lastName,
    email,
    countryCode,
    contactNumber,
    fromCurrency,
    toCurrency,
    amount,
  } = state;

  const isFormValid = (): boolean => {
    return (
      firstName.valid &&
      lastName.valid &&
      email.valid &&
      countryCode.valid &&
      contactNumber.valid &&
      fromCurrency.valid &&
      toCurrency.valid &&
      amount.valid
    );
  };

  return (
    <div className="quote border rounded">
      {appContext.state.error && (
        <div className="bg-danger p-3" style={{ color: '#fff' }}>
          <h3>{appContext.state.error}</h3>
          <p>Try again</p>
        </div>
      )}
      <Container className="quote">
        <Form className="form" onSubmit={handleSubmit}>
          <Row>
            <Col md={6}>
              <FormGroup>
                <Label for="firstName">
                  First name <span className="text-danger">*</span>
                </Label>
                <Input
                  type="text"
                  required
                  name="firstName"
                  id="firstName"
                  valid={firstName.touched && firstName.valid}
                  invalid={firstName.touched && !firstName.valid}
                  value={firstName.value}
                  onChange={handleOnChange}
                  onBlur={validateInput}
                />

                <FormFeedback>{firstName.errorMessage}</FormFeedback>
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for="lastName">
                  Last name <span className="text-danger">*</span>
                </Label>
                <Input
                  type="text"
                  name="lastName"
                  id="lastName"
                  valid={lastName.touched && lastName.valid}
                  invalid={lastName.touched && !lastName.valid}
                  value={lastName.value}
                  onChange={handleOnChange}
                  onBlur={validateInput}
                />
                <FormFeedback>{lastName.errorMessage}</FormFeedback>
              </FormGroup>
            </Col>
          </Row>
          <FormGroup>
            <Label for="email">Email</Label>
            <Input
              type="email"
              name="email"
              id="email"
              valid={email.touched && email.valid}
              invalid={email.touched && !email.valid}
              value={email.value}
              onChange={handleOnChange}
              onBlur={validateInput}
            />
            <FormFeedback>{email.errorMessage}</FormFeedback>
          </FormGroup>
          <FormGroup>
            <Label for="contactNumber">
              Telephone/Mobile <span className="text-danger">*</span>
            </Label>
            <InputGroup>
              <InputGroupAddon addonType="prepend">
                <Button>{countryCode.value}</Button>
              </InputGroupAddon>
              <Input
                type="number"
                name="contactNumber"
                valid={contactNumber.touched && contactNumber.valid}
                invalid={contactNumber.touched && !contactNumber.valid}
                value={contactNumber.value}
                onChange={handleOnChange}
                onBlur={validateInput}
              />
              <FormFeedback>{contactNumber.errorMessage}</FormFeedback>
            </InputGroup>
          </FormGroup>

          <div className="currency bg-light">
            <Row>
              <Col md={6}>
                <FormGroup>
                  <Label for="fromCurrency">
                    From Currency <span className="text-danger">*</span>
                  </Label>
                  <Input
                    type="select"
                    id="fromCurrency"
                    name="fromCurrency"
                    valid={fromCurrency.touched && fromCurrency.valid}
                    invalid={fromCurrency.touched && !fromCurrency.valid}
                    value={fromCurrency.value}
                    onChange={handleOnChange}
                  >
                    <option value="AUD">Australian Dollor (AUD)</option>
                    <option value="USD">United States Dollor (USD)</option>
                  </Input>
                  <FormFeedback>{fromCurrency.errorMessage}</FormFeedback>
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="toCurrency">
                    To Currency <span className="text-danger">*</span>
                  </Label>
                  <Input
                    type="select"
                    id="toCurrency"
                    name="toCurrency"
                    valid={toCurrency.touched && toCurrency.valid}
                    invalid={toCurrency.touched && !toCurrency.valid}
                    value={toCurrency.value}
                    onChange={handleOnChange}
                  >
                    <option value="AUD">Australian Dollor (AUD)</option>
                    <option value="USD">United States Dollor (USD)</option>
                  </Input>
                  <FormFeedback>{toCurrency.errorMessage}</FormFeedback>
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <FormGroup>
                  <Label for="amount">
                    Amount <span className="text-danger">*</span>
                  </Label>
                  <Input
                    type="number"
                    name="amount"
                    id="amount"
                    min={250}
                    valid={amount.touched && amount.valid}
                    invalid={amount.touched && !amount.valid}
                    value={amount.value}
                    onChange={handleOnChange}
                    onBlur={validateInput}
                  />
                  <FormFeedback>{amount.errorMessage}</FormFeedback>
                </FormGroup>
              </Col>
            </Row>
          </div>
          <div className="text-center">
            <button className="btn btn-primary" disabled={!isFormValid()}>
              Get Quote
            </button>
          </div>
        </Form>
      </Container>
    </div>
  );
};

export default Quote;
