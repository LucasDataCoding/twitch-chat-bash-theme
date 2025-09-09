<template>
  <div class="wrapper-nav-top flex items-center">
    <router-link to="/">
      <img class="w-[70px]" src="../assets/logo.svg" alt="logo ceyra" style="margin-right: 2rem" />
    </router-link>
    <div class="logo">
      <span class="primary"> Ceyra </span>

      <span class="secondary"> Chat </span>
    </div>
  </div>
</template>

style.<style lang="scss" scoped>
.wrapper-nav-top {
  padding: 1rem 2rem;
  margin-bottom: 5rem;

  border-bottom: 0.5px solid var(--p-primary-400);
}
</style>
