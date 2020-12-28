# particle_system_core

A core component of the particle system to construct model of the particle system.

The renderer is a test render of webgl for testing.

Its target WebGL version is WebGL1.

## Core

```mermaid
graph LR
   render(Render)
   material(Material)
   ps_data(Particle System Data)
   particle(Particle)
   emitter_player(Emitter Player)
   module_part(Module Part)
   module(Module)
   emitter(Emitter)
   particle_system(Particle System)

   emitter_player -.- ps_data
   emitter_player --> particle

   module_part -.- emitter_player

   module --> module_part
   module --> material
   module -.- emitter_player
   module -.- render

   emitter -.- ps_data
   emitter --> emitter_player
   emitter --> module

   particle_system --> ps_data
   particle_system -.- module
   particle_system --> emitter
   particle_system -.- material
   particle_system --> render

   
```

### Renderer

```mermaid
graph LR
    context(Context)
    stats(Stats)
    render_data(Render Data)
    particle_system_data(Particle System Data)
    texture(Texture)
    emitter_bounds_outline(Emitter Bounds Outline)
    material(Material)
    particle_system(Particle System)
    renderer(Renderer)

    particle_system_data -.- context

    texture -.- context

    emitter_bounds_outline -.- context
    emitter_bounds_outline -.- render_data

    material -.- context
    material -.- stats
    material -.- particle_system_data
    material --> texture
    material -.- render_data

    particle_system --> material
    particle_system -.- render_data
    particle_system --> particle_system_data
    particle_system -.- emitter_bounds_outline

    renderer --> context
    renderer --> stats
    renderer --> render_data
    renderer --> particle_system
    renderer --> emitter_bounds_outline

```
