# User flow: Elgato

```mermaid
flowchart TD
    A[Greeter: “Hey! How are you doing??”] --> B{Feeling?}
    B -->|Doing good!| C[Warm response]
    B -->|Not doing well| D[Kind response]
    C --> E[“Are you feeling lucky today?” / “Wanna know your fate?”]
    D --> E
    E --> F[Meet Elgato using the supplied photo]
    F --> G[Cheerful bright-future fortune]
    G --> H{Choose one of three doors}
    H -->|Door 1| I[“Try again” screen]
    I --> H
    H -->|Door 2| J[Video 1 with supplied audio]
    H -->|Door 3| K[Video 2 with supplied audio]
    J --> L[Freeze last frame for 2.4 seconds]
    K --> L
    L --> M[Black screen; delayed restart button]
    M -->|Intentional click| A
```

## Interaction notes

- The greeting choice determines the greeter's next line. Continue advances to the two fortune questions.
- Door 1 has one short outcome screen. Its **Try again** button returns straight to door selection.
- Door 2 and Door 3 call the jumpscare component from the actual door click. Fullscreen is requested there where supported, and `play()` is called directly from the same gesture. There is no automatic muted fallback.
- A completed clip holds its final video frame on canvas for 2.4 seconds, then transitions to black. A low-contrast restart button appears after five seconds of darkness; before that the screen remains blank.
- Restart closes fullscreen where supported, clears the media source, and returns to the first greeting.
