import { renderComponent , expect } from '../test_helper';
import Login from '../../src/components/login';
import * as actions from '../../src/actions'

describe('Login Component', () => {
  let component;

  beforeEach(() => {
    component = renderComponent(Login);
  });

  describe('Render Tests', () => {

    it('Has correct heading', () => {
      expect(component.find('h2')).to.have.contain('Sign In To 360training.com');
    });

    it('Have three input fields', () => {
      expect(component.find('input[type=text]')).to.exist;
      expect(component.find('input[type=password]')).to.exist;
      expect(component.find('input[type=checkbox]')).to.exist;
    });

    it('Have three buttons', () => {
      expect(component.find('.btn.btn-primary').length).to.equal(3);
    });

    it('Have two hyperlinks', () => {
      expect(component.find('a').length).to.equal(2);
    });
  });

  describe('Actions Tests', () => {

    describe('Authentication', () => {
      it('if valid user', () => {
        const expectedAction = {
          type:'change_auth',
          payload:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOiIyMDE2LTA2LTI5VDAyOjE4OjQ0LjIzMiIsInVzZXJfbmFtZSI6ImFkbWluIiwiYXV0aG9yaXRpZXMiOlsiUk9MRV9MRUFSTkVSIiwiUk9MRV9UUkFJTklOR0FETUlOSVNUUkFUT1IiLCJST0xFX0lOU1RSVUNUT1IiLCJST0xFX1JFR1VMQVRPUllBTkFMWVNUIiwiUk9MRV9MTVNBRE1JTklTVFJBVE9SIl0sImNsaWVudF9pZCI6IlRlc3RDbGllbnQiLCJzY29wZSI6WyJSRUFEIiwiVFJVU1QiLCJXUklURSJdfQ.QMxYwULpVR2rAMYjqtR3AvPpg_4LhZdjgp80juFwOAk'
        };

        expect(actions.authentication(true,"Noman.Liaquat@360training.com","a12345678")).to.contain(expectedAction);
      });

      it('if invalid user', () => {
        const expectedAction = {
          type:'change_auth',
          payload:false
        };

        expect(actions.authentication(false,"Noman.Liaquat@360training.com","asd")).to.contain(expectedAction);
      });
    });

  });
});