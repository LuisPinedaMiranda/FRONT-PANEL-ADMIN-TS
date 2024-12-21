<script lang="ts">
import Sidebar from '@/components/Sidebar.vue';
import TopNav from '@/components/TopNav.vue';
import axios from 'axios';
import { userAuthToken } from '../../stores/Auth';
export default {
  name: 'CreateColaboradorApp',
  components: {
    Sidebar,
    TopNav
  },
  data() {
    return {
      colaborador: {
        rol: "",
        nombre: "",
        apellidos: "",
        email: "",
        password: ""
      },
      backend_url: import.meta.env.VITE_BACKEND_URL
    }
  },
  methods: {
    async validar() {
      if (!this.colaborador.nombre) {
        (this as any).$swal({
          title: 'Ingrese los nombres',
          icon: 'error',
          showConfirmButton: false,
          toast: true,
          position: "top",
          timer: 2000,
          timerProgressBar: true,
        });
      } else if (!this.colaborador.apellidos) {
        (this as any).$swal({
          title: 'Ingrese los apellidos',
          icon: 'error',
          showConfirmButton: false,
          toast: true,
          position: "top",
          timer: 2000,
          timerProgressBar: true,
        });
      } else if (!this.colaborador.email) {
        (this as any).$swal({
          title: 'Ingrese el email',
          icon: 'error',
          showConfirmButton: false,
          toast: true,
          position: "top",
          timer: 2000,
          timerProgressBar: true,
        });
      } else if (!this.colaborador.password) {
        (this as any).$swal({
          title: 'Ingrese el Password',
          icon: 'error',
          showConfirmButton: false,
          toast: true,
          position: "top",
          timer: 2000,
          timerProgressBar: true,
        });
      }
      else if (!this.colaborador.rol) {
        (this as any).$swal({
          title: 'Ingrese el Rol',
          icon: 'error',
          showConfirmButton: false,
          toast: true,
          position: "top",
          timer: 2000,
          timerProgressBar: true,
        });
      } else {
        this.crear_colaborador();
      }
    },
    crear_colaborador() {
      const loginUser = userAuthToken();
      axios.post(this.backend_url + '/registro_usuario_admin', this.colaborador, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${loginUser.token}`
        }
      }).then((result) => {
        console.log(result);
        const { status, message } = result.data.data;
        if (status) {
          (this as any).$swal({
            title: message,
            icon: 'success',
            showConfirmButton: false,
            toast: true,
            position: "top",
            timer: 2000,
            timerProgressBar: true,
          });
          this.$router.push({ name: 'colaborador-index' });
        }
      }).catch((error) => {
        console.log(error);
        if (error.response && error.response.status === 400) {
          const { message } = error.response.data.data;
          (this as any).$swal({
            title: message,
            icon: 'error',
            showConfirmButton: false,
            toast: true,
            position: "top",
            timer: 3000,
            timerProgressBar: true,
          });
        } else {
          (this as any).$swal({
            title: 'Ocurrió un error inesperado',
            icon: 'error',
            showConfirmButton: false,
            toast: true,
            position: "top",
            timer: 3000,
            timerProgressBar: true,
          });
        }
      })
    }
  },
  mounted() {

  }
}

</script>

<template>
  <div>
    <Sidebar />
    <div class="main-content">
      <TopNav />
      <div class="container-fluid">
        <div class="row justify-content-center">
          <div class="col-12 col-lg-10 col-xl-8">

            <!-- Header -->
            <div class="header mt-md-5">
              <div class="header-body">
                <div class="row align-items-center">
                  <div class="col">

                    <!-- Pretitle -->
                    <h6 class="header-pretitle">
                      Usuarios
                    </h6>

                    <!-- Title -->
                    <h1 class="header-title">
                      Nuevo Usuario
                    </h1>

                  </div>
                </div> <!-- / .row -->
                <div class="row align-items-center">
                  <div class="col">

                    <!-- Nav -->
                    <ul class="nav nav-tabs nav-overflow header-tabs">
                      <li class="nav-item">
                        <router-link to="/colaborador/index" class="nav-link">Todos los colaboradores</router-link>
                      </li>
                      <li class="nav-item">
                        <a class="nav-link active">
                          Nuevo Usuario
                        </a>

                      </li>

                    </ul>

                  </div>
                </div>
              </div>
            </div>

            <!-- Form -->
            <div class="row">
              <div class="col-12 col-md-6">

                <!-- First name -->
                <div class="form-group">

                  <!-- Label -->
                  <label for="nombre" class="form-label">
                    Nombres
                  </label>

                  <!-- Input -->
                  <input type="text" class="form-control" v-model="colaborador.nombre" placeholder="Nombres completos">

                </div>

              </div>
              <div class="col-12 col-md-6">

                <!-- Last name -->
                <div class="form-group">

                  <!-- Label -->
                  <label for="apellidos" class="form-label">
                    Apellidos
                  </label>

                  <!-- Input -->
                  <input type="text" class="form-control" v-model="colaborador.apellidos"
                    placeholder="Apellidos completos">

                </div>

              </div>
              <div class="col-12">

                <!-- Email address -->
                <div class="form-group">

                  <!-- Label -->
                  <label for="email" class="mb-1">
                    Correo electrónico
                  </label>

                  <!-- Form text -->
                  <small class="form-text text-muted">
                    This contact will be shown to others publicly, so choose it carefully.
                  </small>

                  <!-- Input -->
                  <input type="email" class="form-control" v-model="colaborador.email" placeholder="Correo electrónico">

                </div>

              </div>

              <!--Password-->
              <div class="col-12">

                <!-- Email address -->
                <div class="form-group">

                  <!-- Label -->
                  <label for="email" class="mb-1">
                    Password
                  </label>
                  <!-- Input -->
                  <input type="password" class="form-control" v-model="colaborador.password" placeholder="Password">

                </div>

              </div>

              <div class="col-12 col-md-6">

                <!-- Birthday -->
                <div class="form-group">

                  <!-- Label -->
                  <label for="rol" class="form-label">
                    Cargo
                  </label>

                  <!-- Input -->
                  <select name="" class="form-select" v-model="colaborador.rol">
                    <option value="" disabled selected>Seleccionar</option>
                    <option value="Administrador">Administrador</option>
                    <option value="Vendedor">Vendedor</option>
                    <option value="Inventariado">Inventariado</option>
                  </select>
                </div>

              </div>

            </div> <!-- / .row -->

            <!-- Divider -->




            <hr class="my-5">

            <!-- Button -->
            <button type="button" class="btn btn-primary" v-on:click="validar()">
              Crear Usuario
            </button>




            <br><br>

          </div>
        </div> <!-- / .row -->
      </div>

    </div>
  </div>
</template>
