<script setup lang="ts">
import { LucideGithub, LucideLoader2 } from 'lucide-vue-next'
import { buttonVariants } from '~/components/ui/button'
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
      provider: 'github'
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

watch(() => status.error, () => {
  if (status.error) {
    setTimeout(() => {
      status.error = null
    }, 5000)
  }
})

</script>

<template>
  <div class="container relative h-full min-h-[800px] flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
    <CustomAlert
      v-if="status.error"
      :title="status.error.name"
      :description="status.error.message"
      variant="destructive"
    />
    <NuxtLink
      to="/register"
      :class="cn(
        buttonVariants({ variant: 'ghost' }),
        'absolute right-4 top-4 md:right-8 md:top-8',
      )"
    >
      Register
    </NuxtLink>
    <div class="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
      <div class="absolute inset-0 bg-zinc-400 dark:bg-background/40">
        <Logo class="h-32" />
      </div>
      <div class="relative z-20 mt-auto">
        <blockquote class="space-y-2">
          <p class="text-lg">
            &ldquo;This library has saved me countless hours of work and
            helped me deliver stunning designs to my clients faster than
            ever before.&rdquo;
          </p>
          <footer class="text-sm">
            Sofia Davis
          </footer>
        </blockquote>
      </div>
    </div>
    <div class="flex h-full items-center lg:p-8">
      <div class="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div class="flex flex-col space-y-2 text-center">
          <h1 class="text-2xl font-semibold tracking-tight">
            Create an account
          </h1>
          <p class="text-sm text-muted-foreground">
            Enter your email below to create your account
          </p>
        </div>

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

        <!-- <p class="px-8 text-center text-sm text-muted-foreground">
          By clicking continue, you agree to our
          <NuxtLink
            to="/"
            class="underline underline-offset-4 hover:text-primary"
          >
            Terms of Service
          </NuxtLink>
          and
          <NuxtLink
            to="/"
            class="underline underline-offset-4 hover:text-primary"
          >
            Privacy Policy
          </NuxtLink>
          .
        </p> -->
      </div>
    </div>
  </div>
</template>
