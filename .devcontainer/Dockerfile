FROM mcr.microsoft.com/vscode/devcontainers/base:debian

ARG USERNAME=vscode

ENV DENO_INSTALL=/deno

RUN mkdir -p /deno \
    && curl -fsSL https://deno.land/x/install/install.sh | sh \
    && chown -R $USERNAME /deno

ENV PATH=${DENO_INSTALL}/bin:${PATH} \
    DENO_DIR=${DENO_INSTALL}/.cache

RUN echo 'export PATH="$HOME/.deno/bin:$PATH"' >> /home/${USERNAME}/.bashrc
