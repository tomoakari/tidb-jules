<script lang="ts">
  import type { ActionData, PageData } from './$types';

  export let data: PageData; // For loading groups
  export let form: ActionData; // For form submission results (errors, etc.)
</script>

<svelte:head>
  <title>Register New User</title>
  <meta name="description" content="Register a new user by providing name and group." />
</svelte:head>

<div class="container">
  <h1>Register New User</h1>

  {#if data.error}
    <p class="error">{data.error}</p>
  {/if}

  <form method="POST">
    <div class="form-group">
      <label for="name">User Name:</label>
      <input type="text" id="name" name="name" value={form?.name ?? ''} required />
      {#if form?.error && form.error.includes('ユーザー名')}
        <p class="error-message">{form.error}</p>
      {/if}
    </div>

    <div class="form-group">
      <label for="group_id">Group:</label>
      <select id="group_id" name="group_id" required>
        <option value="">Select a group</option>
        {#if data.groups}
          {#each data.groups as group (group.id)}
            <option value={group.id} selected={form?.groupId === group.id.toString()}>{group.name}</option>
          {/each}
        {/if}
      </select>
      {#if form?.error && form.error.includes('グループ')}
        <p class="error-message">{form.error}</p>
      {/if}
    </div>

    {#if form?.error && !form.error.includes('ユーザー名') && !form.error.includes('グループ')}
        <p class="error-message">{form.error}</p>
    {/if}

    <button type="submit" class="button">Register</button>
  </form>

  <a href="/" class="link-button">Back to User List</a>
</div>

<style>
  .container {
    max-width: 500px;
    margin: 2rem auto;
    padding: 1rem;
    font-family: sans-serif;
    border: 1px solid #ccc;
    border-radius: 8px;
  }
  .form-group {
    margin-bottom: 1rem;
  }
  label {
    display: block;
    margin-bottom: 0.25rem;
  }
  input[type="text"], select {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    box-sizing: border-box;
  }
  .button {
    display: inline-block;
    padding: 0.75rem 1.5rem;
    background-color: #28a745; /* Green color for registration */
    color: white;
    text-decoration: none;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  .button:hover {
    background-color: #218838;
  }
  .link-button {
    display: inline-block;
    margin-top: 1rem;
    padding: 0.5rem 1rem;
    background-color: #6c757d; /* Gray color for back link */
    color: white;
    text-decoration: none;
    border-radius: 4px;
  }
  .link-button:hover {
    background-color: #5a6268;
  }
  .error {
    color: red;
    margin-bottom: 1rem;
    padding: 0.5rem;
    border: 1px solid red;
    border-radius: 4px;
    background-color: #ffebeb;
  }
  .error-message {
    color: red;
    font-size: 0.875rem;
    margin-top: 0.25rem;
  }
</style>
