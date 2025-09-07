# DCS Beginners Guide

By Sparky

!!! Note
    This guide is for standalone mods, FC3 mods are **Not** covered

## Introduction

When looking through resources for learning how to make DCS mods, I found that they were often lackluster, outdated and difficult to find, especially when it came to creating a mod with an External Flight Model (EFM). The purpose of this document is to provide a centralized resource for new DCS modders who wish to create their own mods with external flight models. Although this guide will not be an exact step by step tutorial, it will cover the steps I took in making my own basic mod with an EFM, which should allow future modders to learn the basics enough so that they can finish creating their mod on their own. 

Any suggestions for improving would be greatly appreciated.

## Skill Requirements

Creating a DCS Mod requires an individual (or team) to have the skills to:

* Create Two 3D models, One External, One internal model
    * Using Either
        * Blender
        * 3DS Max
    * UV Unwrap
    * Animation
    * Use the EDM Exporter
* 2D Texture work
    * Liveries
    * Roughmets and Normal Maps
* Code
    * Lua Knowledge
    * Basic aerodynamic knowledge
    * DCS Plugin Declaration

The above will get you a basic flyable mod with a Simple Flight Model (SFM)

To take your mod to the next level, you will need to create an External Flight Model (EFM).

* C++ Programming skills
* More advanced Aerodynamic understanding
* Mathematics
    * Fundamentals
    * Calculus
    * Trigonometry
