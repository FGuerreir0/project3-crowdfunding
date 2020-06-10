import React, { Component } from 'react';
import './styles.scss';
import { createContribution } from './../../services/contributePayment';
import { loadStripe } from '@stripe/stripe-js';
import { CardElement, Elements, ElementsConsumer } from '@stripe/react-stripe-js';

const STRIPE_PUBLIC_API_KEY = process.env.REACT_APP_STRIPE_API_PUBLIC_KEY;

class ContributeMoneyView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contribution: 0
    };

    this.stripePromise = loadStripe(STRIPE_PUBLIC_API_KEY);
  }

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmission = (event, stripe, elements) => {
    event.preventDefault();

    stripe
      .createPaymentMethod({
        type: 'card',
        card: elements.getElement(CardElement)
      })
      .then((data) => {
        if (data.error) {
          return Promise.reject(data.error);
        } else {
          const userId = this.props.user._id;
          const supporting = this.props.match.params.project_id;
          const amount = this.state.contribution;
          const creditCardToken = data.paymentMethod.id;
          return createContribution({ userId, supporting, amount, creditCardToken });
        }
      })
      .then(() => {
        this.props.history.push(`/project/${this.props.match.params.project_id}`);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    return (
      <div className='mt-12 text-center'>
        <Elements stripe={this.stripePromise}>
          <ElementsConsumer>
            {({ stripe, elements }) => (
              <form onSubmit={(event) => this.handleFormSubmission(event, stripe, elements)}>
                <label htmlFor='contribution'>Contribution: </label>
                <input
                  type='number'
                  name='contribution'
                  id='contribution'
                  value={this.state.contribution}
                  onChange={this.handleInputChange}
                  style={{ textAlign: 'right', width: '80px' }}
                ></input>
                <label>€</label>

                <CardElement
                  option={{
                    style: {
                      base: {
                        fontSize: '50px',
                        color: '#424770',
                        fontFamily: 'sans-serif'
                      },
                      invalid: {
                        color: '#c23d4b'
                      }
                    }
                  }}
                />

                <button className='text-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded'>
                  Confirm Contribution
                </button>
              </form>
            )}
          </ElementsConsumer>
        </Elements>
      </div>
    );
  }
}

export default ContributeMoneyView;
