<script setup lang="ts">
type CardProps = {
  container: TContainer
}

defineProps<CardProps>()
</script>

<template>
  <Card v-bind="$attrs" class="cursor-pointer" @click="$router.push(`/instances/${container.id}`)">
    <CardHeader>
      <CardTitle>{{ container.name }}</CardTitle>
      <CardDescription>{{ EStatus[container.state] }}</CardDescription>
    </CardHeader>
    <CardContent>
      <p class="overflow-hidden truncate">
        Image: {{ container.image }}
      </p>
      <div>
        <p>Portas</p>
        <ul>
          <li
            v-for="(port, index) in container.ports"
            :key="`${index}-${port.privatePort}-${port.publicPort}-${port.type}`"
          >
            <p>
              {{ port.privatePort }}:{{ port.publicPort }} - {{ port.type }}
            </p>
          </li>
        </ul>
      </div>
    </CardContent>
    <CardFooter>
      Card Footer
    </CardFooter>
  </Card>
</template>
