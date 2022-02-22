
window.onload = function () {
   let _utils = {
      get env() {
         return window.location.host.includes('localhost') ?
            'development' :
            'production';
      },
      get remoteApiServerUrl() {
         return (this.env === 'development') ?
            "http://localhost:5000/x/api" :
            "https://iamone.link/x/api";
      },

      saveAuthTokens(obj = {}) {
         localStorage.setItem('ACCESS_TOKEN', obj.accessToken);
         localStorage.setItem('REFRESH_TOKEN', obj.refreshToken);
      },

      setTitle(title = '') {
         const el = document.querySelector('.auth__activity-title');
         if (el instanceof Element) {
            el.textContent = title;
         }
      },

      loading(flag = true) {
         const cta = document.querySelector('.cta');

         if (cta instanceof Element) {
            const loader = cta.querySelector('.app-loader');
            const label = cta.querySelector('.label');

            if (flag) {
               loader.classList.remove('hide');
               label.classList.add('hide');
            } else {
               loader.classList.add('hide');
               label.classList.remove('hide');
            }
         }
      },

      exposeError(error = null) {
         const errorMessage = document.querySelector('.auth__error-msg');
         let message;

         if (!error) {
            errorMessage.textContent = '';

            // @ts-ignore
            errorMessage.style.display = 'none';
            return;
         }

         message = (typeof error === 'string') ? error : error.message;

         if (!errorMessage) {
            alert(message);
         }

         errorMessage.textContent = message;

         // @ts-ignore
         errorMessage.style.display = 'block';
      },

      createRequest(method = 'GET', path = '/ping', data = {}) {
         const self = this;

         return new Promise(function (resolve, reject) {
            const request = new XMLHttpRequest();

            request.onreadystatechange = function () {
               if (this.readyState == 4) {
                  let body;

                  try {
                     if (this.responseText.length > 0) {
                        body = JSON.parse(this.responseText);
                     }
                  } catch (err) {
                     return reject(err);
                  }
                  Reflect.set(request, 'body', body);

                  return resolve(request);
               }
            }

            request.open(method, `${self.remoteApiServerUrl}${path}`, true);
            request.setRequestHeader('Content-Type', 'application/json');

            switch (method) {
               case 'GET':
               case 'DELETE':
                  request.send();
                  break;

               default:
                  request.send(JSON.stringify(data));
                  break;
            }
         })
      },

      createFormDataRequest(method = 'POST', path = '/ping', data = {}) {
         const self = this;

         return new Promise(function (resolve, reject) {
            self.exposeError(null);
            self.loading(true);
            
            self
               .createRequest(method, path, data)
               .then(function (response) {
                  if (response.status === 201 || response.status === 200) {
                     resolve(response.body);
                  } else {
                     self.exposeError(response.body.message);
                     reject(response.body);
                  }
               })
               .catch(function () {
                  self.exposeError("Something went wrong");
               })
               .finally(function() {
                  self.loading(false);
               });
         })
      }
   };

   for (const formName in window['formActionStack']) {
      const form = document.forms[formName];

      if (!(form instanceof HTMLFormElement)) {
         continue;
      }

      form.addEventListener('submit', function (event) {
         const inputs = Array.from(form.querySelectorAll('.app-input > input'));
         let data = {};
         event.preventDefault();

         inputs.forEach(input => {
            return data[input.getAttribute('name')] = input['value'];
         });

         window['formActionStack'][formName].call(this, data, _utils, form, event);
      });
   }
}
