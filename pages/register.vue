<script setup lang="ts">
import { LucideGithub, LucideLoader2 } from 'lucide-vue-next'
import { cn } from '~/lib/utils'

const client = useSupabaseClient()

const user = reactive({
  email: '',
  password: ''
})
const status = reactive<{
  loading: boolean
  error: null | { message: string; name: string }
}>({
  loading: false,
  error: null
})

async function signinWithPassword(event: Event) {
  try {
    event.preventDefault()
    status.loading = true
    const { error } = await client.auth.signInWithPassword(user)
    if (error) {
      throw error
    }
  } catch (error: any) {
    status.error = {
      message: error.message,
      name: error.name
    }
    console.log(error)
  } finally {
    status.loading = false
  }
}

async function signinWithGithub() {
  try {
    status.loading = true
    const { error } = await client.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: 'http://localhost:3000/instances'
      }
    })
    if (error) {
      throw error
    }
  } catch (error: any) {
    status.error = {
      message: error.message,
      name: error.name
    }
    console.error(error)
  } finally {
    status.loading = false
  }
}

</script>
<template>
  <div class="container mx-auto h-full max-w-lg">
    <div class="flex h-full flex-col items-center justify-center">
      <div class="w-full max-w-md">
        <div class="rounded-lg bg-background p-6 shadow shadow-foreground">
          <h1 class="mb-4 text-center text-2xl font-bold">
            Registar
          </h1>
          <div :class="cn('grid gap-6', $attrs.class ?? '')">
            <form @submit="signinWithPassword">
              <div class="grid gap-2">
                <div class="grid gap-1">
                  <label class="sr-only" for="email">
                    Email
                  </label>
                  <Input
                    id="email"
                    placeholder="name@example.com"
                    type="email"
                    auto-capitalize="none"
                    auto-complete="email"
                    auto-correct="off"
                    :disabled="status.loading"
                  />
                </div>
                <div class="grid gap-1">
                  <label class="sr-only" for="password">
                    Password
                  </label>
                  <Input
                    id="password"
                    placeholder="Password"
                    type="password"
                    auto-complete="current-password"
                    :disabled="status.loading"
                  />
                </div>

                <Button :disabled="status.loading">
                  <LucideLoader2 v-if="status.loading" class="mr-2 size-4 animate-spin" />
                  Sign In with Email
                </Button>
              </div>
            </form>
            <div class="relative">
              <div class="absolute inset-0 flex items-center">
                <span class="w-full border-t" />
              </div>
              <div class="relative flex justify-center text-xs uppercase">
                <span class="bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>
            <Button variant="outline" type="button" :disabled="status.loading" @click="signinWithGithub">
              <LucideLoader2 v-if="status.loading" class="mr-2 size-4 animate-spin" />
              <LucideGithub v-else class="mr-2 size-4" />
              GitHub
            </Button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
