<script lang="ts">
import { mapActions, mapState } from 'pinia';
import Sidebar from '@/components/Sidebar.vue';
import TopNav from '@/components/TopNav.vue';
import type { Usuario } from '@/model/types'
import { useUsersStore } from '../../stores/Usuarios';
export default {
  name: 'indexColaboradorApp',
  components: {
    Sidebar,
    TopNav
  },
  data() {
    return {
      usersLocal: [] as Array<Usuario>, // Usa el tipo importado para tipar el array
      backend_url: import.meta.env.VITE_BACKEND_URL,
      filter: '',
      users_const: [] as Array<Usuario>
    }
  },
  computed: {
    ...mapState(useUsersStore, ['users']),
  },
  methods: {
    ...mapActions(useUsersStore, ['fetchUsers']),
    filtering() {
      console.log(this.filter);
      const term = new RegExp(this.filter, 'i')
      this.usersLocal = this.users_const.filter(
        item => term.test(item.nombre) || term.test(item.apellidos) || term.test(item.email)
      );

    }
  },
  beforeMount() {
    this.fetchUsers();
    this.usersLocal = [...this.users];
    this.users_const = [...this.users];
  },
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
                      Colaboradores
                    </h6>

                    <!-- Title -->
                    <h1 class="header-title">
                      Nuevo colaborador
                    </h1>

                  </div>
                </div> <!-- / .row -->
                <div class="row align-items-center">
                  <div class="col">

                    <!-- Nav -->
                    <ul class="nav nav-tabs nav-overflow header-tabs">
                      <li class="nav-item">
                        <a class="nav-link active">
                          Todos los Usuarios
                        </a>
                      </li>
                      <li class="nav-item">
                        <router-link to="/colaborador/create" class="nav-link">Nuevo colaborador</router-link>
                      </li>

                    </ul>

                  </div>
                </div>
              </div>
            </div>

            <div class="tab-content">
              <div class="tab-pane fade show active" id="contactsListPane" role="tabpanel"
                aria-labelledby="contactsListTab">

                <!-- Card -->
                <div class="card"
                  data-list='{"valueNames": ["item-name", "item-title", "item-email", "item-phone", "item-score", "item-company"], "page": 10, "pagination": {"paginationClass": "list-pagination"}}'
                  id="contactsList">
                  <div class="card-header">
                    <div class="row align-items-center">
                      <div class="col">

                        <!-- Form -->
                        <form>
                          <div class="input-group input-group-flush input-group-merge input-group-reverse">
                            <input class="form-control list-search" v-model="filter" type="Buscar Usuario"
                              placeholder="Buscar">
                            <span class="input-group-text">
                              <i class="fe fe-search"></i>
                            </span>
                          </div>
                        </form>

                      </div>

                      <div class="col-auto">

                        <!-- Dropdown -->
                        <button class="btn btn-sm btn-white" type="button" v-on:click="filtering()">
                          <i class="fe fe-sliders me-1"></i> Filter <span class="badge bg-primary ms-1 d-none">0</span>
                        </button>

                      </div>
                    </div> <!-- / .row -->
                  </div>
                  <div class="table-responsive" style="max-height: 400px; overflow-y: auto;">
                    <table class="table table-sm table-hover table-nowrap card-table">
                      <thead>
                        <tr>

                          <th>
                            <a class="list-sort text-muted">Nombres</a>
                          </th>
                          <th>
                            <a class="list-sort text-muted">Cargo</a>
                          </th>
                          <th>
                            <a class="list-sort text-muted">Email</a>
                          </th>
                          <th>
                            <a class="list-sort text-muted">Estado</a>
                          </th>
                          <th>
                            <a class="list-sort text-muted">Acciones</a>
                          </th>
                        </tr>
                      </thead>
                      <tbody class="list fs-base">
                        <!--Inicia aquí-->
                        <tr v-for="item in usersLocal" :key="index">
                          <td>
                            <!-- Avatar -->
                            <div class="avatar avatar-xs align-middle me-2">
                              <img class="avatar-img rounded-circle" src="/assets/img/avatar-1.jpg" alt="...">
                            </div> <a class="item-name text-reset" href="profile-posts.html">{{ item.nombre }} {{
                              item.apellidos }}</a>

                          </td>
                          <td>

                            <!-- Text -->
                            <span class="item-title">Designer</span>

                          </td>
                          <td>

                            <!-- Email -->
                            <a class="item-email text-reset"
                              href="mailto:john.doe@company.com">diana.smiley@company.com</a>

                          </td>
                          <td>

                            <!-- Phone -->
                            <a class="item-phone text-reset" href="tel:1-123-456-4890">(988) 568-3568</a>

                          </td>
                          <td>

                            <!-- Badge -->
                            <span v-if="!item.estado" class="item-score badge bg-danger-soft">Desactivado</span>
                            <span v-if="item.estado" class="item-score badge bg-success-soft">Activo</span>

                          </td>

                          <td class="text-end">

                            <!-- Dropdown -->
                            <div class="dropdown">
                              <a class="dropdown-ellipses dropdown-toggle" href="#" role="button"
                                data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <i class="fe fe-more-vertical"></i>
                              </a>
                              <div class="dropdown-menu dropdown-menu-end">
                                <a href="#!" class="dropdown-item">
                                  Action
                                </a>
                                <a href="#!" class="dropdown-item">
                                  Another action
                                </a>
                                <a href="#!" class="dropdown-item">
                                  Something else here
                                </a>
                              </div>
                            </div>

                          </td>
                        </tr>
                      </tbody>
                      <!--Acaba Aquí-->
                    </table>
                  </div>
                  <div class="card-footer d-flex justify-content-between">



                    <!-- Alert -->
                    <div class="list-alert alert alert-dark alert-dismissible border fade" role="alert">

                      <!-- Content -->
                      <div class="row align-items-center">
                        <div class="col">

                          <!-- Checkbox -->
                          <div class="form-check">
                            <input class="form-check-input" id="listAlertCheckbox" type="checkbox" checked disabled>
                            <label class="form-check-label text-white" for="listAlertCheckbox">
                              <span class="list-alert-count">0</span> deal(s)
                            </label>
                          </div>

                        </div>
                        <div class="col-auto me-n3">

                          <!-- Button -->
                          <button class="btn btn-sm btn-white-20">
                            Edit
                          </button>

                          <!-- Button -->
                          <button class="btn btn-sm btn-white-20">
                            Delete
                          </button>

                        </div>
                      </div> <!-- / .row -->

                      <!-- Close -->
                      <button type="button" class="list-alert-close btn-close" aria-label="Close"></button>

                    </div>

                  </div>
                </div>

              </div>

            </div>
          </div>
        </div> <!-- / .row -->
      </div>

    </div>
  </div>
</template>
