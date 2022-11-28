<template>
  <div>
    <div style="padding: 10px;">
      <div style="margin-bottom: 5px;">
        <select
          v-model="statusId"
        >
          <option
            v-for="( status, index ) of statusesOptions"
            v-bind:key="index"
            v-bind:value="status.id"
            v-bind:disabled="status.disabled"
          >{{ status.title }}</option>
        </select>
      </div>

      <div style="margin-bottom: 5px;">
        <input type="text"
          v-model="title"
          v-bind:disabled="titleDisabled"
        />
      </div>

      <div style="margin-bottom: 5px;">
        <input type="text"
          v-model="url"
          v-bind:disabled="urlDisabled"
        />
      </div>

      <div style="margin-bottom: 5px;">
        <input type="text"
          v-model="shortDescription"
          v-bind:disabled="shortDescriptionDisabled"
        />
      </div>

      <div>
        <button type="button"
          v-on:click="onSaveForm"
        >
          <span>Сохранить</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref, computed } from 'vue'

  const statuses = ref( [
    { id: 1, slug: 'new', title: 'Новая' },
    { id: 2, slug: 'processing', title: 'В обработке' },
    { id: 3, slug: 'completed', title: 'Завершено' },
  ] )

  const ticket = ref( {
    id: 1,
    statusId: 1,
    title: 'Youtube',
    url: 'https://youtube.com',
    shortDescription: 'Видео-хостинг'
  } )
  const ticketStatus = computed( () => (
    ( !!ticket.value.statusId ) ? statuses.value.find( el => el.id === ticket.value.statusId ) : null
  ) )
  const ticketIsProcessing = computed( () => ( ( !!ticketStatus.value ) ? ( ticketStatus.value.slug === 'processing' ) : false ) )

  const statusId = ref( ticket.value.statusId )
  const url = ref( ticket.value.url )
  const title = ref( ticket.value.title )
  const shortDescription = ref( ticket.value.shortDescription )

  const titleDisabled = computed( () => ( !ticketIsProcessing.value ) )
  const urlDisabled = computed( () => ( !ticketIsProcessing.value ) )
  const shortDescriptionDisabled = computed( () => ( !ticketIsProcessing.value ) )

  const disabledOptions = [
    { current: 'new', active: [ 'new', 'processing' ] },
    { current: 'processing', active: [ 'processing', 'completed' ] },
    { current: 'completed', active: [ 'completed' ] }
  ]
  const statusesOptions = computed( () => (
    statuses.value.map( el => {
      el.disabled = true
      if ( !!ticketStatus.value ) {
        const finded = disabledOptions.find( option => option.current === ticketStatus.value.slug )
        if ( finded )
          if ( finded.active.includes( el.slug ) )
            el.disabled = false
      }
      return el
    } )
  ) )

  const onSaveForm = () => {
    ticket.value.statusId = statusId.value
    ticket.value.title = title.value
    ticket.value.url = url.value
    ticket.value.shortDescription = shortDescription.value
  }
</script>