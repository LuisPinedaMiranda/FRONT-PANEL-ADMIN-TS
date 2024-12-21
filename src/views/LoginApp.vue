<script lang="ts">
import axios from 'axios';
import { userAuthToken } from '@/stores/Auth';
export default {
  name: 'LoginApp.vue',
  data() {
    return {
      email: '',
      password: '',
      msm_error: '',
      backend_url: import.meta.env.VITE_BACKEND_URL
    }
  },
  created() {
    console.log(this.backend_url + '/login_usuario')
  },
  methods: {
    validar() {
      if (!this.email) {
        this.msm_error = 'Ingrese un correo electrónico';
      } else if (!this.password) {
        this.msm_error = 'Ingrese una contraseña';
      } else {
        this.msm_error = '';
        this.login();
      }
      console.log(this.msm_error);
    },
    login() {
      const data = {
        email: this.email,
        password: this.password
      }
      axios.post(this.backend_url + '/login_usuario', data, {
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((result: any) => {
        if (result.data.data == undefined) {
          this.msm_error = result.data.message;
        }

        if (result.data.token) {
          console.log(result);
          /*  const user = result.data.usuario;
           const token = result.data.token; */

          const loginUser = userAuthToken();
          loginUser.setUserAndToken(result.data.usuario, result.data.token);

          /* localStorage.setItem('token', result.data.token);
          localStorage.setItem('user', JSON.stringify(result.data.usuario)); */

          this.$router.push({ name: 'about' })
        }

      }).catch((error: any) => {
        console.error(error);
      });

    }

  }
}

</script>

<template>
  <div class="d-flex align-items-center bg-auth border-top border-top-2" style="height: 100% !important">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-12 col-md-8 col-xl-6 my-5">

          <!-- Heading -->
          <h1 class="display-4 text-center mb-3">
            Iniciar sesión
          </h1>

          <!-- Subheading -->
          <p class="text-muted text-center mb-5">
            Panel de Administrador
          </p>

          <!-- Form -->
          <form>

            <div v-if="msm_error" class="alert alert-danger text-center" role="alert">
              {{ msm_error }}
            </div>

            <!-- Email address -->
            <div class="form-group">

              <!-- Label -->
              <label class="form-label">
                Correo Electrónico
              </label>

              <!-- Input -->
              <input type="email" class="form-control" v-model="email" placeholder="name@address.com">

            </div>

            <!-- Password -->
            <div class="form-group">
              <div class="row">
                <div class="col">

                  <!-- Label -->
                  <label class="form-label">
                    Contraseña
                  </label>

                </div>

              </div> <!-- / .row -->

              <!-- Input group -->
              <div class="input-group input-group-merge">

                <!-- Input -->
                <input class="form-control" type="password" v-model="password" placeholder="Enter your password">

                <!-- Icon -->
                <span class="input-group-text">
                  <i class="fe fe-eye"></i>
                </span>

              </div>
            </div>

            <!-- Submit -->
            <button class="btn btn-lg w-100 btn-primary mb-3" type="button" v-on:click="validar()">
              Ingresar
            </button>



          </form>

        </div>
      </div> <!-- / .row -->
    </div> <!-- / .container -->
  </div>
</template>
