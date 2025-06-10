<script lang="ts">
  import type { PageData } from './$types';

  export let data: PageData;
</script>

<svelte:head>
  <title>User List</title>
  <meta name="description" content="List of users and their groups" />
</svelte:head>

<div class="container">
  <h1>User Management</h1>

  {#if data.error}
    <p class="error">{data.error}</p>
  {/if}

  {#if data.users && data.users.length > 0}
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Group</th>
        </tr>
      </thead>
      <tbody>
        {#each data.users as user (user.id)}
          <tr>
            <td>{user.id}</td>
            <td>{user.name}</td>
            <td>{user.group_name}</td>
          </tr>
        {/each}
      </tbody>
    </table>
  {:else if !data.error}
    <p>No users found.</p>
  {/if}

  <a href="/register" class="button">Add New User</a>
</div>

<style>
  .container {
    max-width: 800px;
    margin: 2rem auto;
    padding: 1rem;
    font-family: sans-serif;
  }
  table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 1rem;
  }
  th, td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
  }
  th {
    background-color: #f4f4f4;
  }
  .button {
    display: inline-block;
    padding: 0.5rem 1rem;
    background-color: #007bff;
    color: white;
    text-decoration: none;
    border-radius: 4px;
  }
  .button:hover {
    background-color: #0056b3;
  }
  .error {
    color: red;
    margin-bottom: 1rem;
  }
</style>
