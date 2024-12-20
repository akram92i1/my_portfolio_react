import matplotlib.pyplot as plt
import numpy as np

# Sorted Data
iterations = [1, 5, 5, 10, 10, 20, 20]
temperature_initiale = [300, 100, 300, 200, 200, 200, 200]
lambda_values = [0.99, 0.99, 0.99, 0.97, 0.99, 0.97, 0.99]
reduction_percentage = [24.44, 20.22, 15.65, 11.58, 23.31, 16.06, 24.38]

# Create figure and axes
fig, ax = plt.subplots(figsize=(12, 6))

# Unique iterations and their positions
unique_iterations = sorted(set(iterations))
positions = {it: i for i, it in enumerate(unique_iterations)}

# Width of each bar
bar_width = 0.3

# Track the number of bars plotted for each iteration to create offsets
offsets = {}

# Plot the bars with slight offsets for same iterations
for i, (it, temp, red, lamb) in enumerate(zip(iterations, temperature_initiale, reduction_percentage, lambda_values)):
    pos = positions[it]
    offset = offsets.get(it, 0) * bar_width
    ax.bar(pos + offset, red, width=bar_width, label=f'Iter: {it}, Temp: {temp}°C, λ={lamb}', edgecolor='black')
    ax.text(pos + offset, red, f'{red:.2f}', ha='center', va='bottom', fontsize=9)
    offsets[it] = offsets.get(it, 0) + 1

# Customize x-ticks
ax.set_xticks([positions[it] + (bar_width / 2) for it in unique_iterations])
ax.set_xticklabels([str(it) for it in unique_iterations])

# Labels and title
ax.set_xlabel("Nombre d'itérations")
ax.set_ylabel("Pourcentage de réduction (%)")
ax.set_title("Pourcentage de réduction avec décalage pour les mêmes itérations")
ax.grid(axis='y', linestyle='--', alpha=0.7)

# Add legend
ax.legend(fontsize='small')

# Display the plot
plt.tight_layout()
plt.show()
